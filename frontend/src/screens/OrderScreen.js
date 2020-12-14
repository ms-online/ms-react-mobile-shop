import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Form,
  Button,
  ListGroup,
  Row,
  Col,
  Image,
  Card,
  Modal,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import axios from 'axios'
import { ORDER_PAY_RESET } from '../contents/orderContents'
import { v4 as uuidv4 } from 'uuid'

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id
  const dispatch = useDispatch()
  //弹出框的状态
  const [show, setShow] = useState(false)
  //支付二维码图片
  const [image, setImage] = useState('')
  const [text, setText] = useState('请扫码')

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, error: errorPay, success: successPay } = orderPay

  //计算价格
  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (!order || order._id !== orderId || successPay) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId))
    }

    // eslint-disable-next-line
  }, [dispatch, history, userInfo, order, orderId, successPay])

  //创建开启和关闭弹出框的函数
  const handleClose = () => {
    setShow(false)
  }

  const handlePayment = () => {
    //获取微信返回的支付二维码图片
    setImage('https://www.thenewstep.cn/pay/index.php?' + 'pid=' + order._id)
    setShow(true)

    //设置定时器去监听支付
    let timer = setInterval(() => {
      //请求支付status
      axios.get('/status').then((res) => {
        if (res.data.status === 0) {
          setText('请扫码')
        } else if (res.data.status === 1) {
          setText('您已经完成了扫码，请支付')
        } else if (res.data.status === 2) {
          //创建支付结果对象
          const paymentResult = {
            id: uuidv4(),
            status: res.data.status,
            updata_time: Date.now(),
            email_address: order.user.email,
          }
          //更新完成支付的订单
          dispatch(payOrder(orderId, paymentResult))
          setText('您已经支付成功，请等待发货')
          setShow(false)
          clearTimeout(timer)
        }
      })
    }, 1000)
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>订单号：{order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>收货地址</h2>
              <p>
                <strong>收件人地址：</strong>
              </p>
              <p>
                <strong>姓名:</strong>
                {order.user.name}
              </p>
              <p>
                {' '}
                <strong>邮箱:</strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                {order.shippingAddress.province},{order.shippingAddress.city},
                {order.shippingAddress.address},
                {order.shippingAddress.postalCode}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  发货时间：{order.DeliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>未发货</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>支付方式</h2>
              <p>
                <strong>支付方法：</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>支付时间：{order.paidAt}</Message>
              ) : (
                <Message variant='danger'>待支付</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>产品订单</h2>
              {order.orderItems.length === 0 ? (
                <Message>购物车为空</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X {item.price} = {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>订单详情</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>产品总价</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>运费</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>订单总价</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  onClick={handlePayment}
                  disabled={order.orderItems === 0}
                >
                  去支付
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>订单号：{order._id}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>支付金额： ¥{order.totalPrice}</p>
                    <p>支付方式： {order.paymentMethod}</p>
                    <Row>
                      <Col md={6} style={{ textAlign: 'center' }}>
                        <Image src={image} />
                        <p
                          style={{ backgroundColor: '#00C800', color: 'white' }}
                        >
                          {text}
                        </p>
                      </Col>
                      <Col>
                        <Image src='/images/saoyisao.jpg' />
                      </Col>
                    </Row>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant='primary' onClick={handleClose}>
                      关闭
                    </Button>
                  </Modal.Footer>
                </Modal>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen

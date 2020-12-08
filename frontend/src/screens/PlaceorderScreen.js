import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, ListGroup, Row, Col, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../actions/orderActions'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'

const PlaceorderScreen = ({ history }) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)

  //计算价格
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  cart.shippingPrice = addDecimals(cart.itemsPrice > 5000 ? 0 : 20)

  cart.totalPrice = addDecimals(
    Number(cart.itemsPrice) + Number(cart.shippingPrice)
  )
  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
    }
    // eslint-disable-next-line
  }, [history, success])
  //提交订单函数
  const placeorderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>收货地址</h2>
              <p>
                <strong>收件人地址：</strong>
                {cart.shippingAddress.province},{cart.shippingAddress.city},
                {cart.shippingAddress.address},{cart.shippingAddress.postalCode}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>支付方式</h2>
              <strong>支付方法：</strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>产品订单</h2>
              {cart.cartItems.length === 0 ? (
                <Message>购物车为空</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
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
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>运费</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>订单总价</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  onClick={placeorderHandler}
                  disabled={cart.cartItems === 0}
                >
                  提交订单
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceorderScreen

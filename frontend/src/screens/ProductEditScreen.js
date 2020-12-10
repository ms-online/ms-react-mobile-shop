import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'
import FormContainer from '../components/FormContainer'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    if (!product.name || product._id !== productId) {
      dispatch(listProductDetails(productId))
    } else {
      setName(product.name)
      setPrice(product.price)
      setImage(product.image)
      setBrand(product.brand)
      setCategory(product.category)
      setCountInStock(product.countInStock)
      setDescription(product.description)
    }
  }, [dispatch, history, productId, product])
  //表单提交函数
  const submitHandler = (e) => {
    e.preventDefault()
    //dispatch 更新产品函数
  }
  return (
    <FormContainer>
      <Link to='/admin/productlist' className='btn btn-dark my-3'>
        返回上一页
      </Link>
      <h1>编辑产品界面</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>名称：</Form.Label>
            <Form.Control
              type='name'
              placeholder='请输入产品名称'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='price'>
            <Form.Label>产品价格：</Form.Label>
            <Form.Control
              type='number'
              placeholder='请输入价格'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='image'>
            <Form.Label>图片：</Form.Label>
            <Form.Control
              type='text'
              placeholder='请输入图片路径'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='brand'>
            <Form.Label>品牌：</Form.Label>
            <Form.Control
              type='text'
              placeholder='请输入品牌'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>{' '}
          <Form.Group controlId='countInStock'>
            <Form.Label>产品库存：</Form.Label>
            <Form.Control
              type='number'
              placeholder='请输入库存数量'
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='category'>
            <Form.Label>产品类型：</Form.Label>
            <Form.Control
              type='text'
              placeholder='请输入产品类型'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Label>产品介绍：</Form.Label>
            <Form.Control
              type='text'
              placeholder='请输入产品介绍'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            更新信息
          </Button>
        </Form>
      )}
    </FormContainer>
  )
}

export default ProductEditScreen

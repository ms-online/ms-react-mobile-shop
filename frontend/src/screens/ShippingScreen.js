import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [province, setProvince] = useState(shippingAddress.province)

  //提交收货地址函数
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, province }))
    history.push('/payment')
  }
  return (
    <FormContainer>
      <h1>收货地址</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>详细地址：</Form.Label>
          <Form.Control
            type='text'
            placeholder='请输入详细地址'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>所在地区：</Form.Label>
          <Form.Control
            type='text'
            placeholder='请输入所在地区'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode'>
          <Form.Label>邮政编码：</Form.Label>
          <Form.Control
            type='text'
            placeholder='请输入邮政编码'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='province'>
          <Form.Label>所在省份：</Form.Label>
          <Form.Control
            type='text'
            placeholder='请输入所在省份'
            value={province}
            required
            onChange={(e) => setProvince(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          继续下一步
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen

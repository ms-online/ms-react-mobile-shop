import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])
  //表单提交函数
  const submitHandler = (e) => {
    e.preventDefault()
    //dispatch login函数
    dispatch(login(email, password))
  }
  return (
    <FormContainer>
      <h1>登录</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>邮箱地址：</Form.Label>
          <Form.Control
            type='email'
            placeholder='请输入邮箱'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>密码：</Form.Label>
          <Form.Control
            type='password'
            placeholder='请输入密码'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          登录
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          新用户？
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            去注册
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen

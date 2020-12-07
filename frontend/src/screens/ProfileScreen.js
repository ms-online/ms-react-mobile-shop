import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserDetails } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../contents/userContents'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, success])
  //表单提交函数(更新用户资料)
  const submitHandler = (e) => {
    e.preventDefault()
    //dispatch update profile函数
    dispatch(updateUserDetails({ id: user._id, name, email, password }))
  }
  return (
    <Row>
      <Col md={3}>
        <h2>个人资料</h2>
        {success && <Message variant='success'>更新成功！</Message>}
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>姓名：</Form.Label>
            <Form.Control
              type='name'
              placeholder='请输入姓名'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
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
          <Form.Group controlId='confirmPassword'>
            <Form.Label>确认密码：</Form.Label>
            <Form.Control
              type='password'
              placeholder='请确认密码'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            更改资料
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>我的订单</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen

import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

//@desc    创建订单
//@route   POST/api/orders
//@access  私密
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('没有订单信息')
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    })

    const createOrder = await order.save()
    res.status(201).json(createOrder)
  }
})
//@desc    依据订单id获取订单
//@route   GET/api/orders/:id
//@access  私密
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('查询不到订单')
  }
})

export { addOrderItems, getOrderById }

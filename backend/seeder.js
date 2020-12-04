import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

//插入样本数据到数据库
const importData = async () => {
  try {
    //清空数据库中的样本数据
    await Order.deleteMany()
    await User.deleteMany()
    await Product.deleteMany()

    //实现样本数据插入
    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    console.log('样本数据插入成功！'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

//插入样本数据到数据库
const destroyData = async () => {
  try {
    //清空数据库中的样本数据
    await Order.deleteMany()
    await User.deleteMany()
    await Product.deleteMany()

    console.log('样本数据销毁成功！'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

//判断命令行执行的函数
if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}

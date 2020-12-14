import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import colors from 'colors'
import connectDB from './config/db.js'
import prodcutRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import axios from 'axios'
dotenv.config()
connectDB()

const app = express()
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.get('/', (req, res) => {
  res.send('服务器已经运行...')
})

//获取支付的status状态码
app.get('/status', (req, res) => {
  axios.get('https://www.thenewstep.cn/pay/logs/log.txt').then((response) => {
    res.json({ status: response.data })
  })
})

app.use('/api/products', prodcutRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

//upload文件夹作为静态文件
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `服务器在${process.env.NODE_ENV}模式下的${PORT}端口号运行`.yellow.bold
  )
)

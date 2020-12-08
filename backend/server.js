import express from 'express'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import colors from 'colors'
import connectDB from './config/db.js'
import prodcutRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()
connectDB()

const app = express()
app.use(express.json())
app.get('/', (req, res) => {
  res.send('服务器已经运行...')
})
app.use('/api/products', prodcutRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `服务器在${process.env.NODE_ENV}模式下的${PORT}端口号运行`.yellow.bold
  )
)

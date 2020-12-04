import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import prodcutRoutes from './routes/productRoutes.js'

dotenv.config()
connectDB()

const app = express()

app.get('/', (req, res) => {
  res.send('服务器已经运行...')
})
app.use('/api/products', prodcutRoutes)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `服务器在${process.env.NODE_ENV}模式下的${PORT}端口号运行`.yellow.bold
  )
)

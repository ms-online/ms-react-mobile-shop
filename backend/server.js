import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import products from './data/products.js'

dotenv.config()
connectDB()

const app = express()

app.get('/', (req, res) => {
  res.send('服务器已经运行...')
})
app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find((product) => product._id === req.params.id)
  res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`服务器在${process.env.NODE_ENV}模式下的${PORT}端口号运行`)
)

const express = require('express')
const app = express()
const keys = require('./config/dev')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const categoryRouter = require('./routers/categories')
const imageRouter = require('./routers/images')
const productRouter = require('./routers/products')
const cartRouter = require('./routers/cartItems')
//const cartServiceRouter = require('./routers/cartItems')
const orderRouter = require('./routers/orders')
const userRouter = require('./routers/users')
const loginRouter = require('./routers/login')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

app.use('/public', express.static('public'))

const url = keys.mongoURI 
//mongoose.Promise = global.Promise
const connected = mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})

if (connected) {
  console.log('Database connected')
} else {
  console.log('Error: Database not connected')
}



app.use('/api/category', categoryRouter)
app.use('/api/upload', imageRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
//app.use('/api/seCart', cartServiceRouter)
app.use('/api/order', orderRouter)
app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  next()
}

app.use(requestLogger)

const unknownEndPoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint '})
}

app.use(unknownEndPoint)


module.exports = app
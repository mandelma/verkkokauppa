const orderRouter = require('express').Router()
const Order = require('../models/order')

orderRouter.get('/', async (req, res) => {
  const orders = await Order.find({})
  res.send(orders)
})

orderRouter.post('/', async (req, res) => {
  const body = req.body
  try {
    const order = new Order({
      user: body.user,
      date: body.date,
      productId: body.productId,
      product: body.product,
      productTotalPrice: body.productTotalPrice,
      productPrice: body.productPrice,
      count: body.count,
      image: body.image
    })
    const savedOrder = await order.save()
    res.status(200).json(savedOrder.toJSON())
  } catch (err) {
    console.log('Error:', err)
  }
})

module.exports = orderRouter
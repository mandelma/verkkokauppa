const productRouter = require('express').Router()
const Product = require('../models/product')

productRouter.get('/', async (req, res) => {
  const result = await Product.find({}).populate('image').populate('category')
  res.send(result)
})

productRouter.post('/', async (req, res) => {
  const body = req.body
  try {
    const newProduct = new Product({
      name: body.name,
      price: body.price,
      count: body.count
    })

    const savedProduct = await newProduct.save()
    res.status(200).json(savedProduct.toJSON())
  } catch (err) {
    console.log('Error:', err)
  }
})

module.exports = productRouter

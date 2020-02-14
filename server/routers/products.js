const productRouter = require('express').Router()
const Product = require('../models/product')
const Category = require('../models/category')

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

productRouter.put('/:id', async (req, res) => {
  const body = req.body
  try {
    const product = {
      name: body.name,
      price: body.price,
      count: body.count
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, product, { new: true }
    )

    res.status(200).json(updatedProduct.toJSON())

  } catch (err) {
    console.log('Error:', err)
  }
})

productRouter.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    const categoryId = product.category
    console.log('category Id xxxx', categoryId)
    const category = await Category.findById(categoryId)
    console.log('categori xxx', category)
    await Product.findByIdAndDelete(req.params.id)
    const index = category.product.indexOf(req.params.id)
    if (index !== -1) {
      console.log('index xxx', index)
      category.product.splice(index, 1)
    }
    await category.save()
    res.status(204).end()
  } catch (err) {
    console.log('Error:', err)
  }
})

module.exports = productRouter

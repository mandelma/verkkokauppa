const Category = require('../models/category')
const categoryRouter = require('express').Router()
const Image = require('../models/image')
const Product = require('../models/product')

categoryRouter.get('/', async (req, res) => {
  const result = await Category.find({})
  res.send(result)
})

categoryRouter.post('/', async (req, res) => {
  const body = req.body
  console.log('body here in backend', body)
  try {
    const newCat = new Category({
      name: body.name
    })

    const savedCat = await newCat.save()
    res.status(200).json(savedCat.toJSON())
  } catch (err) {
    console.log('Error: ', err)
  }
})

categoryRouter.post('/:id/product', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      count: req.body.count,
      category: category._id,
      image: req.body.image
    })
    //const image = await Image.findById(newProduct.image)
    const image = await Image.findById(newProduct.image)
    console.log('image in backend: ', image)
    const result = await newProduct.save()
    
    category.product = category.product.concat(result._id)
    image.product = result._id  //image.product.concat(result._id)
    await category.save()
    await image.save()
    res.status(201).json(result.toJSON())
  }catch (exception) {
    console.log('Error:', exception)
  }
  

})

categoryRouter.put('/:id', async (req, res) => {
  const body = req.body
  try {
    const newCategory = {
      name: body.name
    } 
    
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id, newCategory, { new: true }
    )

    res.status(200).json(updatedCategory.toJSON())
  } catch (err) {
    console.log('Error: ', err)
  }
})

module.exports = categoryRouter
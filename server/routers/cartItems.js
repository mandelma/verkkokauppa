const cartRouter = require('express').Router()
const Cart = require('../models/cart')
const Product = require('../models/product')

cartRouter.get('/', async (req, res) => {
  const result = await Cart.find({}).populate('product',
  {name: 1, price: 1, count: 1})
  res.send(result)
})

cartRouter.post('/:id', async (req, res) => {
  const body = req.body
  try {
    const product = await Product.findById(req.params.id)
    const itemInCart = new Cart({
      username: body.username,
      image: body.image,
      productName: body.productName,
      defPrice: product.price,
      productPrice: body.productPrice,
      productCount: body.productCount,
      productCartCount: 1,
      product: product._id
    })

    const savedCart = await itemInCart.save()
    //product.cart = product.cart.concat(savedCart._id)
    
    //await product.save()
    res.json(savedCart.toJSON())
  }catch (err) {
    console.log('Error: ', err)
  }
})

cartRouter.post('/siivous', async (req, res) => {
  const body = req.body
  try {
    const tilaus =  new Cart({
      user: body.user,
      name: body.name,
      price: body.price
    })

    const savedTilaus = await tilaus.save()
    res.json(savedTilaus.toJSON())
  } catch (err) {
    console.log('Error:', err)
  }
})

cartRouter.put('/:id', async (req, res) => {
  const body = req.body

  try {
    const cartUp = {
      username: body.username,
      image: body.image,
      productName: body.productName,
      productPrice: body.productPrice,
      productCount: body.productCount,
      productCartCount: body.productCartCount
    }
    console.log('cart up', cartUp)
    const cartUpdate = await Cart.findByIdAndUpdate(
      req.params.id, cartUp, { new: true }
    )
    res.status(200).json(cartUpdate.toJSON())
  } catch (err) {
    console.log('Error:', err)
  }
})

cartRouter.delete('/:id', async (req, res) => {
  try {
    
    await Cart.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (err) {
    console.log('Error:', err)
  }
})

cartRouter.delete('/', async (req, res) => {
  try {
    await Cart.deleteMany({})
    
    res.status(204).end()
  } catch (err) {
    console.log('Error:', err)
  }
  
})

module.exports = cartRouter
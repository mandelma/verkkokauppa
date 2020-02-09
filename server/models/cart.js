const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
  username: {
    type: String,
  },
  image: {
    type: String
  },
  productName: {
    type: String
  },
  productSecondName: {
    type: String
  },
  defPrice: {
    type: Number
  },
  productPrice: {
    type: Number
  },
  productCount: {
    type: Number
  },
  productCartCount: {
    type: Number
  },
  product: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart
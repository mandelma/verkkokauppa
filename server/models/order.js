const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  user: {
    type: String
  },
  date: {
    type: String
  },
  cartId: {
    type: Array
  },
  product: {
    type: Array
  },
  productTotalPrice: {
    type: Array
  },
  
  productPrice: {
    type: Array
  },
  count: {
    type: Array
  },
  image: {
    type: Array
  }
})

module.exports = mongoose.model('Order', orderSchema)
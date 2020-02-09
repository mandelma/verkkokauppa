const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imgSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  productImg: {
    type: String
  }, 
  name: {
    type: String
  },
  product: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  
  
}, {
  collection: 'Images'
})


module.exports = mongoose.model('Image', imgSchema)
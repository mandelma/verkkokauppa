const initialOrder = {
  productId: [],
  product: [],
  productPrice: [],
  productTotalPrice: [],
  productCount: [],
  productCartCount: [],
  image: []
}

const orderDataReducer = (state = initialOrder, action) => {
  switch (action.type) {
    case 'SET_ORDER':
      return action.data
    default:
      return state
  }
}

const newOrder = {
  cartId: [],
  product: [],
  productId: [],
  productPrice: [],
  productTotalPrice: [],
  productCount: [],
  productCartCount: [],
  image: []
}

export const setOrder = (cart) => {
  
  cart.forEach(element => {
    newOrder.cartId.push(element._id)
    newOrder.product.push(element.productName)
    newOrder.productId.push(element.productId)
    newOrder.productPrice.push(element.defPrice)
    newOrder.productTotalPrice.push(element.productPrice)
    newOrder.productCount.push(element.productCount)
    newOrder.productCartCount.push(element.productCartCount)
    newOrder.image.push(element.image)
  })
  return dispatch => 
   dispatch({
     type: 'SET_ORDER',
     data: newOrder
  })  

  
} 

export default orderDataReducer
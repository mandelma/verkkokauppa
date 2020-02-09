const initialOrder = {
  productId: [],
  product: [],
  productPrice: [],
  productTotalPrice: [],
  productCount: [],
  image: []
}

const orderDataReducer = (state = initialOrder, action) => {
  switch (action.type) {
    case 'SET_ORDER':
      const orderProduct = {...state, product: [...state.product, action.data.product]}
      const orderPrice = {...state, product: [...state.product, action.data.product]}
      return action.data
      //...state, productPrice: [...state.productPrice, action.data.productPrice]}
    default:
      return state
  }
}

const newOrder = {
  productId: [],
  product: [],
  productPrice: [],
  productTotalPrice: [],
  productCount: [],
  image: []
}

export const setOrder = (cart) => {
  
  cart.forEach(element => {
    newOrder.productId.push(element._id)
    newOrder.product.push(element.productName)
    newOrder.productPrice.push(element.defPrice)
    newOrder.productTotalPrice.push(element.productPrice)
    newOrder.productCount.push(element.productCount)
    newOrder.image.push(element.image)
  })
  return dispatch => 
   dispatch({
     type: 'SET_ORDER',
     data: newOrder
  })  

  
} 

export default orderDataReducer
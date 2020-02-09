import categoryService from '../services/category'
import productService from '../services/product'

const productReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_PRODUCT':
      return state.concat(action.data)
    case 'ADD_PRODUCT':
      return state.concat(action.data)
    default:
      return state
  }
}

export const initializeProducts = () => {
  return async dispatch => {
    const products = await productService.getAll()
    dispatch({
      type: 'GET_PRODUCT',
      data: products
    })
  }
}

export const addNewProduct = (id, product) => {
  return async dispatch => {
    const addedProduct = await categoryService.addProduct(id, product)
    dispatch({
      type: 'ADD_PRODUCT',
      data: addedProduct
    })
  }
}

export default productReducer
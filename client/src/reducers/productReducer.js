import categoryService from '../services/category'
import productService from '../services/product'

const productReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_PRODUCT':
      return state.concat(action.data)
    case 'ADD_PRODUCT':
      return state.concat(action.data)
    case 'EDIT_PRODUCT':
      const id = action.data.id
      console.log('edited product in productReducer xxxxxxxxxxxxxxxxxxxxxxx', action.data)
      return  state.map(product => product.id !== id ? product : action.data)
    case 'DEL_PRODUCT':
      return state.filter(product => product.id !== action.data)
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

export const editProduct = (id, newObject) => {
  return async dispatch => {
    const editedProduct = await productService.update(id, newObject)
    dispatch({
      type: 'EDIT_PRODUCT',
      data: editedProduct
    })
  }
}

export const removeProduct = (id) => {
  return async dispatch => {
    await productService.remove(id)
    dispatch({
      type: 'DEL_PRODUCT',
      data: id
    })
  }
}

export default productReducer
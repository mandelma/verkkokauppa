import categoryService from '../services/category'

const categoryReducer = (state = [], action) => {
  switch (action.type) {
    case 'CATEGORY':
      return state.concat(action.data)
    case 'ADD_NEW':
      console.log('new cat action data', action.data)
      return state.concat(action.data)
    case 'CAT_UPDATE':
      const id = action.data.id
      return state.map(category => category.id !== id ? category : action.data)
    default:
      return state
  }
}

export const initializeCategory = () => {
  return async dispatch => {
    const categories = await categoryService.getAll()
    dispatch({
      type: 'CATEGORY',
      data: categories
    })
  }
}

export const createCategory = (categoryName) => {
  return async dispatch => {
    const category = {name: categoryName}
    const newCategory = await categoryService.create(category)
    dispatch ({
      type: 'ADD_NEW',
      data: newCategory
    })
  }
} 

export const updateCategory = (id, categoryObject) => {
  return async dispatch => {
    const newCategory = await categoryService.update(id, categoryObject)
    dispatch({
      type: 'CAT_UPDATE',
      data: newCategory
    })
  }
}

export default categoryReducer
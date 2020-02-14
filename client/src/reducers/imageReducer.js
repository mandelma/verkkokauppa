import imageService from '../services/images'

const imageReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_IMAGE':
      return state.concat(action.data)
    case 'CREATE_IMAGE':
      return state.concat(action.data)
    case 'DEL_IMAGE':
      const id = action.data
      return state.filter(img => img._id !== id)
    default:
      return state
  }
}

export const initializeImages = () => {
  return async dispatch => {
    const images = await imageService.getAll()
    dispatch({
      type: 'GET_IMAGE',
      data: images
    })
  }
}

export const addImage = (imageData) =>{
  return async dispatch => {
    dispatch({
      type: 'CREATE_IMAGE',
      data: imageData
    })
    
  }
} 

export const createImage = (imageData) => {
  return async dispatch => {
    const image = await imageService.createImage(imageData)
    dispatch({
      type: 'CREATE_IMAGE',
      data: image
    })
  }
}

export const removeImage = (id) => {
  return async dispatch => {
    await imageService.remove(id)
    dispatch({
      type: 'DEL_IMAGE',
      data: id
    })
  }
}

export default imageReducer
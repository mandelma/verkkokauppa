import imageService from '../services/images'

const imageReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_IMAGE':
      return state.concat(action.data)
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

export default imageReducer
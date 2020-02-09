const errorMessageReducer = (state = null, action) => {
  switch (action.type) {
    case 'ERROR':
      return action.data
    case 'CLEAR_ERROR':
      return action.data
    default:
      return state
  }
}

export const errorMessage = (errMsg, time) => {
  return async dispatch => {
    dispatch({
      type: 'ERROR',
      data: errMsg
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_ERROR',
        data: null
      })
    }, time * 1000)
  }

} 

export default errorMessageReducer
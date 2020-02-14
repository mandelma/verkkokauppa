const infoMessageReducer = (state = null, action) => {
  switch (action.type) {
    case 'CREATE_INFO':
      return action.data
    case 'CLEAR':
      return action.data
    default:
      return state
  }
}

export const createInfoMessage = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'CREATE_INFO',
      data: message
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR',
        data: null
      })
    }, time)
  }
}

export default infoMessageReducer


const messageReduser = (state = null, action) => {
  switch (action.type) {
    case 'MESSAGE':
      return action.data
    case 'CLEAR_MSG':
      return action.data
    default:
      return state
  }
}

export const message = (msg, time) => {
  return async dispatch => {
    dispatch({
      type: 'MESSAGE',
      data: msg
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_MSG',
        data: null
      })
    }, time * 1000)
  }
}

export default messageReduser
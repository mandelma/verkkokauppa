import loginService from '../services/login'

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOG_IN':
      console.log('action data login', action.data.name)
      return action.data
    case 'LOG_OUT':
      return action.data
    default:
      return state
  }
}

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'LOG_IN',
      data: user
    })
  }
}

export const logInUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username: username,
      password: password
    })
    window.localStorage.setItem(
      'loggedUser', JSON.stringify(user)
    )
    dispatch({
      type: 'LOG_IN',
      data: user
    })
  }
}

export const logOut = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedUser')
    dispatch({
      type: 'LOG_OUT',
      data: null
    })    
  }
}

export default loginReducer
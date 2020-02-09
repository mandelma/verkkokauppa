import userService from '../services/users'

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_USER':
      return state.concat(action.data)
    case 'NEW_USER':
      return state.concat(action.data)
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    
    dispatch({
      type: 'GET_USER',
      data: users
    })
  }
}

export const createUser = (newUser) => {
  return async dispatch => {
    const user = await userService.createUser(newUser)
    dispatch({
      type: 'NEW_USER',
      data: user
    })
  }
}

export default userReducer
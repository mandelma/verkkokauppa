import orderService from '../services/order'

const orderReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ORDER':
      return state.concat(action.data)
    case 'NEW_ORDER':
      return state.concat(action.data)
    default:
      return state
  }
}

export const initializeOrders = () => {
  return async dispatch => {
    const orders = await orderService.getAll()
    dispatch({
      type: 'GET_ORDER',
      data: orders
    })
  }
}

export const createOrder = (newOrder) => {
  return async dispatch => {
    const order = await orderService.create(newOrder)
    dispatch({
      type: 'NEW_ORDER',
      data: order
    })
  }
}

export default orderReducer
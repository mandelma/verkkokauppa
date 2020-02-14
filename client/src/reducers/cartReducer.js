import cartService from '../services/cartList'

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ITEMS':
      return state.concat(action.data)
    case 'CREATE_ITEM':
      console.log('cartReducer create item', action.data)
      return state.concat(action.data)
    case 'DEL_ITEM':
      const id = action.data
      console.log('id here in reducer', id)
      return state.filter(item => item._id !== id)
    case 'DEL_CART':
      return state = []
    case 'EDIT_ITEM':
      const itemId = action.data._id
      return state.map(item => item._id !== itemId ? item : action.data)
    default:
      return state
  }
}

export const initializeCartItems = () => {
  return async dispatch => {
    const items = await cartService.getAll()
    dispatch({
      type: 'GET_ITEMS',
      data: items
    })
  }
}

export const createItem = (id, item) => {
  return async dispatch => {
    const cartItem = await cartService.create(id, item)
    dispatch({
      type: 'CREATE_ITEM',
      data: cartItem
    })
  }
}

// Create siivous palvelu
export const createService = (seCart) => {
  return async dispatch => {
    const createSeItem = await cartService.createSiivousCart(seCart)
    dispatch({
      type: 'CREATE_ITEM',
      data: createSeItem
    })
  }
}

export const updateCartItem = (itemId, editedCart) => {
  return async dispatch => {
    const updatedItem = await cartService.update(itemId, editedCart)
    dispatch({
      type: 'EDIT_ITEM',
      data: updatedItem
    })
  }
}

export const removeItem = (id) => {
  return async dispatch => {
    await cartService.remove(id)
    dispatch({
      type: 'DEL_ITEM',
      data: id

    })
  }
}

export const delAllCart = () => {
  return async dispatch => {
      await cartService.removeAll()
      dispatch({
        type: 'DEL_CART'
      })
  }
}

export default cartReducer
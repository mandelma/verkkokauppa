const isNewCategoryPage = (state = false, action) => {
  switch (action.data) {
    case 'OPEN_NEW_CAT':
      return true
    default:
      return state
  }
}

export const openNewCat = () => {
  return dispatch => {
    dispatch({
      type: 'OPEN_NEW_CAT'
    })
  }
}



export default isNewCategoryPage
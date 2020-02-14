import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Main from './main'
import Admin from './admin/admin'
import { initializeCategory } from './reducers/categoryReducer'
import { initializeProducts } from './reducers/productReducer'
import { initializeImages } from './reducers/imageReducer'
import { initializeCartItems } from './reducers/cartReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeOrders } from './reducers/orderReducer'
import { logInUser, logOut, setUser } from './reducers/loginReducer'


const App = (props) => {

  const [logIn, setLogIn] = useState('')

  useEffect(() => {
    props.initializeCategory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    props.initializeProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    props.initializeImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    props.initializeCartItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    props.initializeUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    props.initializeOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (user !== undefined && user !== null) {
        props.setUser(user)
        setLogIn(user)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Main logInUser = {logIn}/>
      <Admin />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    category: state.category,
    products: state.product,
    image: state.image,
    cart: state,
    order: state.order,
    user: state.user,
    userIn: state.userIn,
    //logIn: ownProps.logIn
    
  }
}


const mapDispatchToProps = {
  initializeCategory,
  initializeProducts,
  initializeImages,
  initializeCartItems,
  initializeUsers,
  initializeOrders,
  logInUser,
  logOut,
  setUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
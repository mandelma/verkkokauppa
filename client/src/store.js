import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import categoryReducer from './reducers/categoryReducer'
import messageReducer from './reducers/message/messageReduser'
import errorMessageReducer from './reducers/message/errMessageReduser'
import infoMessageReducer from './reducers/message/infoMessageReducer'
import productReducer from './reducers/productReducer'
import imageReducer from './reducers/imageReducer'
import cartReducer from './reducers/cartReducer'
import userReducer from './reducers/userReducer'
import loginReducer from './reducers/loginReducer'
import orderReducer from './reducers/orderReducer'
import orderDataReducer from './reducers/orderDataReducer'
//import isNewCategoryPage from './reducers/createCategoryReducer'


const reducer = combineReducers({
  category: categoryReducer,
  message: messageReducer,
  infoMessage: infoMessageReducer,
  errorMessage: errorMessageReducer,
  product: productReducer,
  image: imageReducer,
  cart: cartReducer,
  user: userReducer,
  userIn: loginReducer,
  order: orderReducer,
  orderData: orderDataReducer
  //isNewCat: isNewCategoryPage
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
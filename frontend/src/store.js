import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDeatilsReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDeatilsReducer,
  cart: cartReducer,
})

//获取本地存储的购物车信息
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

//初始化state值
const initialState = {
  cart: { cartItems: cartItemsFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store

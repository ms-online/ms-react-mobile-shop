import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../contents/cartConstents'
import axios from 'axios'
//添加到购物车action
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })
  //将购买物品添加到本地存储
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

//删除产品action
export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

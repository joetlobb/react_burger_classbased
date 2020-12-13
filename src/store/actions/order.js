import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchangeBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
}

export const purchanseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}

export const purchangeBurgerStart = (orderData) => {
  return dispatch => {
    axios.post('/orders.json', orderData)
    .then(response => {
      dispatch(purchangeBurgerSuccess(response.data, orderData))
    })
    .catch(error => {
      dispatch(purchanseBurgerFail(error))
    });
  }
}
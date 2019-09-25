import {
    PURCHASE_BURGER_SUCCESS,
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_START,
    PURCHASE_INIT,
} from './types';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
      type: PURCHASE_BURGER_SUCCESS,
      orderId: id,
      orderData
    };
};
  
export const purchaseBurgerFail = error => {
    return {
      type: PURCHASE_BURGER_FAIL,
      error
    };
};

export const purchaseBurgerStart = () => {
    return {
      type: PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData) => {
    return dispatch => {
        const req = async () => {
            try {
                dispatch(purchaseBurgerStart());
                axios.post('/orders.json', orderData)
                .then(response => {
                    dispatch(purchaseBurgerSuccess(response.data.name, orderData));
                })
            } catch (e) {
                dispatch(purchaseBurgerFail());
            }
        };
        req();
    };
};

export const purchaseInit = () => {
    return {
      type: PURCHASE_INIT
    };
};
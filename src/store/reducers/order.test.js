import orderReducer from './order';
import * as actionTypes from '../actions/types';

describe('orderReducer reducer', () => {
    it('should return initial state', () => {
        expect(orderReducer(undefined, {})).toEqual({
            orders: [],
            loading: false,
            purchased: false
        });
    });

    it('should store the token upon successful purchase', () => {
        expect(
            //initial state, action
            orderReducer(
                {
                    orders: [],
                    loading: false,
                    purchased: false
                },
                {
                    type: actionTypes.PURCHASE_BURGER_SUCCESS,
                    data: 'some-data',
                    orderId: 'some-user-id'
                }
            )
        ).toEqual({
            orders: [{id: 'some-user-id'}],
            loading: false,
            purchased: true,
        });
    });
});
import burgerBuilderReducer from './burger';
import * as actionTypes from '../actions/types';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    onion: 0.4,
    tomato: 0.5
}

describe('burger reducer', () => {
    it('should return initial state', () => {
        expect(burgerBuilderReducer(undefined, {})).toEqual({
            ingredients: null,
            totalPrice: 4,
            error: false,
            building: false
        });
    });

});
import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS,
    FETCH_INGREDIENTS_FAILED
} from '../actions/types';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    onion: 0.4,
    tomato: 0.5
}

const burgerBuilderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            /* ------------ Refactorized/New/Mad approarch: ----------- */
            const updatedIngredient = {
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            };
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            };
            return updateObject(state, updatedState);
            
            /* ------------ Usual approarch: ------------ */
            // return {...state,
            //     ingredients: {
            //         ...state.ingredients,
            //         [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            //     },
            //     totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            //     };
        case REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
                };
        case SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    tomato: action.ingredients.tomato,
                    onion: action.ingredients.onion,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat,
                    salad: action.ingredients.salad,
                },
                totalPrice: 4,
                error: false,
                building: false
            };
        case FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
}

export default burgerBuilderReducer;

  
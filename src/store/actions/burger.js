import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS,
    FETCH_INGREDIENTS_FAILED,
    GET_INGREDIENTS
} from './types';
import axios from '../../axios-orders';


export const addIngredient = name => {
    return {
      type: ADD_INGREDIENT,
      ingredientName: name
    };
};
  
export const removeIngredient = name => {
    return {
      type: REMOVE_INGREDIENT,
      ingredientName: name
    };
};

export const setIngredients = ingredients => {
    return {
      type: SET_INGREDIENTS,
      ingredients
    };
};

export const fetchIngredientsFailed = () => {
    return {
      type: FETCH_INGREDIENTS_FAILED
    };
};

export const fetchIngredients = () => {
    return dispatch => {
      const req = async () => {
        try {
          const res = await axios.get('https://burger-builder-c8bc7.firebaseio.com/ingredients.json');
          dispatch(setIngredients(res.data));
        } catch (e) {
          dispatch(fetchIngredientsFailed());
        }
      };
      req();
    };
    return {
      type: GET_INGREDIENTS
    };
};
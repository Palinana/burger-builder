import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_LOGOUT,
} from '../actions/types';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case AUTH_SUCCESS:
            return {
              ...state,
              token: action.idToken,
              userId: action.userId,
              error: null,
              loading: false
            };
        case AUTH_FAIL:
            return {
              error: action.error,
              loading: false
            };
        default:
            return state; 
    }
}

export default reducer;
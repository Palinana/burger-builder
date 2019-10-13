import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_CHECK_TIMEOUT,
    AUTH_LOGOUT,
    SET_AUTH_REDIRECT_PATH
} from './types';
import axios from 'axios';
import firebaseAPI from '../../secrets';

// for spinner and loading
export const authStart = () => {
    return {
        type: AUTH_START
    };
};
  
export const authSuccess = (token, userId) => {
    return {
        type: AUTH_SUCCESS,
        idToken: token,
        userId
    };
};
  
export const authFail = error => {
    return {
        type: AUTH_FAIL,
        error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: AUTH_LOGOUT
    };
};

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        };
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${firebaseAPI}`;
        if(!isSignup) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseAPI}`
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response)

                const expirationDate = new Date(
                    new Date().getTime() + 3600 * 1000
                );
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);

                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(3600));
            })
            .catch(err => {
                console.log(err)
                dispatch(authFail(err.response.data.error));
            })
    }
}

export const setAuthRedirectPath = path => {
    return {
        type: SET_AUTH_REDIRECT_PATH,
        path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } 
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            }
            else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(
                    checkAuthTimeout(expirationDate.getTime() - new Date().getTime() / 1000)
                )
            }
        }
    }
}
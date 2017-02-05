const initialState = {
    isFetching: false,
    isRegistering: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false,
    isRegistered: false
}

import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE
} from '../actions/auth'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export const auth = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                user: action.creds
            })
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ''
            })
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            })
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false
            })
        case REGISTER_REQUEST:
            return Object.assign({}, state, {
                isRegistering: true,
                isRegistered: false
            })
        case REGISTER_SUCCESS:
            return Object.assign({}, state, {
                isRegistering: false,
                isRegistered: true,
                errorMessage: ''
            })
        case REGISTER_FAILURE:
            return Object.assign({}, state, {
                isRegistering: false,
                isRegistered: false,
                errorMessage: action.message
            })
        default:
            return state
    }
}
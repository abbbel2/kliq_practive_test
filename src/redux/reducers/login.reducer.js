import { LOADING_LOGIN_USER, LOGIN_USER, ERROR_LOGIN_USER, RESET_LOGIN_USER } from "../actions/auth/login.type";

const initial_state = {
    error: null,
    login_data: null,
    loading: false
}

export default function(state = initial_state, action) {
    switch (action.type) {
        case RESET_LOGIN_USER:
            return initial_state
        case LOGIN_USER:
            return {
                login_data: action.payload,
                loading: false
            }
        case ERROR_LOGIN_USER:
            return {
                error: action.payload,
                loading: false
            }
        case LOADING_LOGIN_USER:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}
import { LOADING_LOGIN_USER, LOGIN_USER, ERROR_LOGIN_USER, RESET_LOGIN_USER } from "./login.type";
import axios from "axios";

export const login = (credentials, dispatch) => {
    dispatch({ type: RESET_LOGIN_USER });
    dispatch({ type: LOADING_LOGIN_USER });
    axios.post("http://178.62.110.174/kliq-user/auth/login", credentials).then(res => dispatch({
        type: LOGIN_USER,
        payload: res.data
    })).catch(err => dispatch({ type: ERROR_LOGIN_USER, payload: err }))
}

// export const loading_login = () => {
//     return {
//         type: LOADING_LOGIN_USER
//     }
// }
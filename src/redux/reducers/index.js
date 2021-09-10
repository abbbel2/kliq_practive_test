import { combineReducers } from "redux";
import LoginReducer from "./login.reducer";

export default combineReducers({
    login: LoginReducer
});
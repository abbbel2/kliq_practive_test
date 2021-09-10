import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import AllReducer from "../reducers";
import logger from 'redux-logger'


const middleware = [thunk];
const initialState = {};

const store = createStore(
    AllReducer,
    initialState,
    applyMiddleware(...middleware)
);

export default store;
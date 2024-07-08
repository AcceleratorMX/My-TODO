import {applyMiddleware, compose, legacy_createStore as createStore} from "redux";
import rootReducer from "./reducers/root";
import {composeWithDevTools} from "@redux-devtools/extension";

const initialState = {};

const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose;

const store = createStore(rootReducer(), initialState, composeFunc(applyMiddleware()));

export default store;

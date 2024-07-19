import {applyMiddleware, legacy_createStore as createStore} from "redux";
import rootReducer from "./reducers/root.js";
import {createEpicMiddleware} from "redux-observable";
import {rootEpic} from "./epics/root.js";


const epicMiddleware = createEpicMiddleware();
const store = createStore(rootReducer(), applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);

export default store;

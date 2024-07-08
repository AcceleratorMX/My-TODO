import { combineReducers } from "redux";
import todos from "./todos";
import categories from "./categories";

const rootReducer= () => combineReducers({
    todos: todos,
    categories: categories
});

export default rootReducer;
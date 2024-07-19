import { combineReducers } from 'redux';
import todos from './todos.js';
import categories from './categories.js';
import storage from './storage.js';

const rootReducer= () => combineReducers({
    todos: todos,
    categories: categories,
    storage: storage
});

export default rootReducer;
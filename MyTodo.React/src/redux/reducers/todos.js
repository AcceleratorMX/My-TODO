import {
    FETCH_TODOS_SUCCESS, ADD_TODO_SUCCESS,
    DELETE_TODO_SUCCESS, ACTION_FAILURE, CHANGE_PROGRESS_SUCCESS
} from '../constants.js';

const initialState = {
    todos: [],
    error: null
};

const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TODOS_SUCCESS:
            return {
                ...state,
                todos: action.payload
            };
        case ADD_TODO_SUCCESS:
            return {
                ...state,
                todos: [...state.todos, action.payload]
            };
        case CHANGE_PROGRESS_SUCCESS:
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id ? {...todo, isDone: action.payload.isDone} : todo
                )
            };
        case DELETE_TODO_SUCCESS:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            };
        case ACTION_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default todosReducer;

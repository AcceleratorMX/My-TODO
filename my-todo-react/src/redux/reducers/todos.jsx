import {ADD_TODO, DELETE_TODO, IS_DONE} from "../actions/helper";

const initialState = {
    todos: [],
    autoIncrementIds: 1,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO: {
            return {
                ...state,
                todos: [...state.todos, {
                    id: state.autoIncrementIds,
                    name: action.payload.name,
                    categoryId: action.payload.categoryId,
                    deadline: action.payload.deadline,
                    isDone: false
                }],
                autoIncrementIds: state.autoIncrementIds + 1,
            }
        }
        case DELETE_TODO: {
            return {
                ...state,
                todos: [...state.todos.filter(todo => todo.id !== action.payload.id)],
            }
        }
        case IS_DONE: {
            return {
                ...state,
                todos: state.todos.map((todo) => {
                    if (todo.id === action.payload.id) {
                        return {...todo, isDone: todo.isDone = true};
                    }
                    return todo;
                }),
            }
        }
        default:
            return state;
    }
};
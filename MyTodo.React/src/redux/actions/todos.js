import {createAction} from '../helpers';
import {
    ADD_TODO_REQUEST,
    ADD_TODO_SUCCESS, CHANGE_PROGRESS_REQUEST, CHANGE_PROGRESS_SUCCESS,
    DELETE_TODO_REQUEST, DELETE_TODO_SUCCESS,
    FETCH_TODOS_REQUEST,
    FETCH_TODOS_SUCCESS
} from "../constants.js";

export const fetchTodos = createAction(FETCH_TODOS_REQUEST);
export const fetchTodosSuccess = createAction(FETCH_TODOS_SUCCESS);

export const addTodo = createAction(ADD_TODO_REQUEST);
export const addTodoSuccess = createAction(ADD_TODO_SUCCESS);

export const deleteTodo = createAction(DELETE_TODO_REQUEST);
export const deleteTodoSuccess = createAction(DELETE_TODO_SUCCESS);

export const changeProgress = createAction(CHANGE_PROGRESS_REQUEST);
export const changeProgressSuccess = createAction(CHANGE_PROGRESS_SUCCESS);

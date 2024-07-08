import {ADD_TODO, createAction, DELETE_TODO, IS_DONE} from "./helper";

export const addTodo = createAction(ADD_TODO);
export const deleteTodo = createAction(DELETE_TODO);
export const isDone = createAction(IS_DONE);
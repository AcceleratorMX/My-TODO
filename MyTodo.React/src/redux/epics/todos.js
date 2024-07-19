import {createEpic} from '../helpers.js';
import {
    addTodoSuccess,
    changeProgressSuccess,
    deleteTodoSuccess,
    fetchTodosSuccess
} from "../actions/todos.js";

import {
    ADD_TODO_REQUEST,
    CHANGE_PROGRESS_REQUEST,
    DELETE_TODO_REQUEST,
    FETCH_TODOS_REQUEST
} from "../constants.js";
import {of} from "rxjs";
import {actionFailure} from "../actions/errors.js";

export const fetchTodosEpic = createEpic(
    FETCH_TODOS_REQUEST,
    `
        query {
            jobs {
                id
                name
                deadline
                isDone
                categoryId
                category {
                    id
                    name
                }
            }
        }
    `,
    () => ({}),
    response => fetchTodosSuccess(response.data.jobs),
    error => of(actionFailure(error.message))
);

export const addTodoEpic = createEpic(
    ADD_TODO_REQUEST,
    `
          mutation CreateJob($job: JobInputType!) {
                createJob(job: $job) {
                id
                name
                deadline
                isDone
                categoryId
            }
        }
    `,
    action => ({job: action.payload}),
    response => addTodoSuccess(response.data.createJob),
    error => of(actionFailure(error.message))
);

export const updateTodoStatusEpic = createEpic(
    CHANGE_PROGRESS_REQUEST,
    `
        mutation ChangeProgress($id: Int!, $isDone: Boolean!) {
            changeProgress(id: $id, isDone: $isDone) {
                id
                isDone
            }
        }
    `,
    action => ({id: action.payload.id, isDone: action.payload.isDone}),
    response => changeProgressSuccess(response.data.changeProgress),
    error => of(actionFailure(error.message))
);

export const deleteTodoEpic = createEpic(
    DELETE_TODO_REQUEST,
    `
        mutation DeleteJob($id: Int!) {
            deleteJob(id: $id) 
        }
    `,
    action => ({id: action.payload.id}),
    response => {
        const id = parseInt(response.data.deleteJob.split(' ')[3]);
        return deleteTodoSuccess(id);
    },
    error => of(actionFailure(error.message))
);

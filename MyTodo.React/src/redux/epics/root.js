import {BehaviorSubject} from "rxjs";
import {combineEpics} from "redux-observable";
import {addTodoEpic, deleteTodoEpic, fetchTodosEpic, updateTodoStatusEpic} from "./todos.js";
import {mergeMap} from "rxjs/operators";
import {addCategoryEpic, deleteCategoryEpic, fetchCategoriesEpic} from "./categories.js";

const epic$ = new BehaviorSubject(combineEpics(
    fetchTodosEpic,
    addTodoEpic,
    deleteTodoEpic,
    updateTodoStatusEpic,
    fetchCategoriesEpic,
    addCategoryEpic,
    deleteCategoryEpic
));

export const rootEpic = (action$, state$) =>
    epic$.pipe(mergeMap(epic => epic(action$, state$)));

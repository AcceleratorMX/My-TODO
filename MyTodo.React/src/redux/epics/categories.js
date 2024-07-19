import {of} from "rxjs";
import {createEpic} from "../helpers";
import {addCategorySuccess, deleteCategorySuccess, fetchCategoriesSuccess} from "../actions/categories.js";
import {actionFailure} from "../actions/errors.js";
import {ADD_CATEGORY_REQUEST, DELETE_CATEGORY_REQUEST, FETCH_CATEGORIES_REQUEST} from "../constants.js";


export const fetchCategoriesEpic = createEpic(
    FETCH_CATEGORIES_REQUEST,
    `
        query {
            categories {
                id
                name
            }
        }
    `,
    () => ({}),
    response => fetchCategoriesSuccess(response.data.categories),
    error => of(actionFailure(error.message))
);

export const addCategoryEpic = createEpic(
    ADD_CATEGORY_REQUEST,
    `
    mutation CreateCategory($category: CategoryInputType!) {
            createCategory(category: $category) {
                id
                name
            }
        }
    `,
    action => ({category: action.payload}),
    response => addCategorySuccess(response.data.createCategory),
    error => of(actionFailure(error.message))
);

export const deleteCategoryEpic = createEpic(
    DELETE_CATEGORY_REQUEST,
    `
        mutation DeleteCategory($id: Int!) {
            deleteCategory(id: $id) 
        }
    `,
    action => ({id: action.payload.id}),
    response => {
        const id = parseInt(response.data.deleteCategory.split(' ')[3]);
        return deleteCategorySuccess(id);
    },
    error => of(actionFailure(error.message))
);

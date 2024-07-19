import {createAction} from "../helpers";
import {
    ADD_CATEGORY_REQUEST, ADD_CATEGORY_SUCCESS, DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS,
    FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS
} from "../constants.js";

export const fetchCategories = createAction(FETCH_CATEGORIES_REQUEST);
export const fetchCategoriesSuccess = createAction(FETCH_CATEGORIES_SUCCESS);

export const addCategory = createAction(ADD_CATEGORY_REQUEST);
export const addCategorySuccess = createAction(ADD_CATEGORY_SUCCESS);

export const deleteCategory = createAction(DELETE_CATEGORY_REQUEST);
export const deleteCategorySuccess = createAction(DELETE_CATEGORY_SUCCESS);

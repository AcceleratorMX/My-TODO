import {INPUT_FIELD_IS_REQUIRED, SELECT_CATEGORY_IS_REQUIRED} from "./constants.js";

export const validateTodoFields = (todo, selectedCategory) => {
    const errors = {};

    if (!todo.trim()) {
        errors.name = INPUT_FIELD_IS_REQUIRED;
    }

    if (!selectedCategory) {
        errors.categoryId = SELECT_CATEGORY_IS_REQUIRED;
    }

    return errors;
};

export const validateCategoryFields = (category) => {
    const errors = {};

    if (!category.trim()) {
        errors.name = INPUT_FIELD_IS_REQUIRED;
    }

    return errors;
};
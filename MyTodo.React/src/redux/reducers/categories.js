import {FETCH_CATEGORIES_SUCCESS, ADD_CATEGORY_SUCCESS, DELETE_CATEGORY_SUCCESS, ACTION_FAILURE} from "../constants.js";

const initialState = {
    categories: [],
    error: null
};

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload
            };
        case ADD_CATEGORY_SUCCESS:
            console.log('ADD_CATEGORY_SUCCESS', action.payload);
            return {
                ...state,
                categories: [...state.categories, action.payload]
            };
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: state.categories.filter(category => category.id !== action.payload)
            };
        case ACTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default categoriesReducer;

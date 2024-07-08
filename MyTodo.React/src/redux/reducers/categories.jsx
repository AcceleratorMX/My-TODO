import {ADD_CATEGORY, DELETE_CATEGORY} from "../actions/helper";

const initialState = {
    categories: [
        {
            id: 1,
            name: "Без категорії"
        },
        {
            id: 2,
            name: "Дім"
        },
        {
            id: 3,
            name: "Робота"
        },
        {
            id: 4,
            name: "Навчання"
        }
    ],
    autoIncrementIds: 5,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_CATEGORY: {
            return {
                ...state,
                categories: [...state.categories, {
                    id: state.autoIncrementIds,
                    name: action.payload.name
                }],
                autoIncrementIds: state.autoIncrementIds + 1
            }
        }
        case DELETE_CATEGORY: {
            return {
                ...state,
                categories: [...state.categories.filter(category => category.id !== action.payload.id)]
            }
        }
        default: return state;
    }
};
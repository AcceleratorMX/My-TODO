import {ACTION_FAILURE, SWITCH_STORAGE_TYPE, XML} from "../constants.js";

const initialState = {
    currentStorage: XML,
    error: null
};

const storageReducer = (state = initialState, action) => {
    console.log("Action Received:", action);

    switch (action.type) {
        case SWITCH_STORAGE_TYPE:
            return {
                ...state,
                currentStorage: action.payload
            };
        case ACTION_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default storageReducer;
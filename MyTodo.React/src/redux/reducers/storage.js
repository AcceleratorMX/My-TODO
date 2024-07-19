import {} from '../helpers';
import {SWITCH_STORAGE_TYPE ,XML} from "../constants.js";

const initialState = {
    currentStorage: XML
};

const storageReducer = (state = initialState, action) => {
    console.log("Action Received:", action); // Додано для перевірки

    switch (action.type) {
        case SWITCH_STORAGE_TYPE:
            return {
                ...state,
                currentStorage: action.payload
            };
        default:
            return state;
    }
};

export default storageReducer;
export {initialState};
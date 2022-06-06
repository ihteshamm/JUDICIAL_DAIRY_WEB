
import {
    GET_LAW_DETAILS,
    ENABLE_LAW_LOADING,
    DISABLE_LAW_LOADING,
} from  "../actions/types";

const initialState = {
    dictionaryData: [],
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_LAW_DETAILS:
            return {
                ...state,
                dictionaryData: action.payload,
            };
        case ENABLE_LAW_LOADING:
            return {
                ...state,
                loading: true,
            }
        case DISABLE_LAW_LOADING:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}

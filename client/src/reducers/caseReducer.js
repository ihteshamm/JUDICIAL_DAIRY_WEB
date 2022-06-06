import { GET_CASE_DETAILS, ENABLE_CASE_LOADING, DISABLE_CASE_LOADING } from "../actions/types";

const initialState = {
    caseData: [],
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CASE_DETAILS:
            return {
                ...state,
                caseData: action.payload,
            };
        case ENABLE_CASE_LOADING:
            return {
                ...state,
                loading: true,
            }
        case DISABLE_CASE_LOADING:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}

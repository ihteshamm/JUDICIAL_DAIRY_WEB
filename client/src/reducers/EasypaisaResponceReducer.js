import { GET_EASYPAISARESPONCE_DETAILS, ENABLE_EASYPAISARESPONCE_LOADING, DISABLE_EASYPAISARESPONCE_LOADING } from "../actions/types";

const initialState = {
    EasypaisaData: [],
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_EASYPAISARESPONCE_DETAILS:
            return {
                ...state,
                EasypaisaData: action.payload,
            };
        case ENABLE_EASYPAISARESPONCE_LOADING:
            return {
                ...state,
                loading: true,
            }
        case DISABLE_EASYPAISARESPONCE_LOADING:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}

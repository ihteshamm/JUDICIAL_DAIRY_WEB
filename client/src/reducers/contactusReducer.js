import { GET_CONTACTUS_ACTION, ENABLE_CONTACTUS_ACTION_LOADING, DISABLE_CONTACTUS_ACTION_LOADING } from "../actions/types";

const initialState = {
    contactusData: [],
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CONTACTUS_ACTION:
            return {
                ...state,
                contactusData: action.payload,
            };
        case ENABLE_CONTACTUS_ACTION_LOADING:
            return {
                ...state,
                loading: true,
            }
        case DISABLE_CONTACTUS_ACTION_LOADING:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}

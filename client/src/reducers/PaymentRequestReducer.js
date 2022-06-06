import { GET_PAYMENT_DETAILS, ENABLE_PAYMENT_LOADING, DISABLE_PAYMENT_LOADING } from "../actions/types";

const initialState = {
    paymentData: [],
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PAYMENT_DETAILS:
            return {
                ...state,
                paymentData: action.payload,
            };
        case ENABLE_PAYMENT_LOADING:
            return {
                ...state,
                loading: true,
            }
        case DISABLE_PAYMENT_LOADING:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}

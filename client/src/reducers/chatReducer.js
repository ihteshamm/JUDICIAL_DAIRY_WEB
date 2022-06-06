import { GET_CHAT_DETAILS, ENABLE_CHAT_LOADING, DISABLE_CHAT_LOADING } from "../actions/types";

const initialState = {
    chatData: [],
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CHAT_DETAILS:
            return {
                ...state,
                chatData: action.payload,
            };
        case ENABLE_CHAT_LOADING:
            return {
                ...state,
                loading: true,
            }
        case DISABLE_CHAT_LOADING:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}

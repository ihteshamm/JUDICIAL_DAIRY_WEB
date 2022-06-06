import axios from "axios";
import { GET_ERRORS } from "./types";
import {
    GET_CHAT_DETAILS,
    ENABLE_CHAT_LOADING,
    DISABLE_CHAT_LOADING,
} from "./types";

export const getmessages = (sender,reciever) => dispatch => {
    dispatch(enableChatLoading());
    axios
        .get(`/api/chats/getmessages/${sender}/${reciever}`)
        .then((res) => {

            dispatch({
                type: GET_CHAT_DETAILS,
                payload: res.data
            });
            dispatch(disableChatLoading());
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
// export const deletemessages = (sender,reciever) => dispatch => {
//     dispatch(enableChatLoading());
//     axios
//         .delete(`/api/chats/deletemessages/${sender}/${reciever}`)
//         .then((res) => {

//             dispatch({
//                 type: GET_CHAT_DETAILS,
//                 payload: res.data
//             });
//             dispatch(disableChatLoading());
//         }
//         )
//         .catch((err) => {
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: err.response.data
//             });
//         });
// };
export const addmessage = (requestData) => dispatch => {
    axios
        .post("/api/chats/addmessage", requestData)
        .then((res) => {
            dispatch({
                type: GET_CHAT_DETAILS,
                payload: res.data
            });
//            dispatch(getCase());
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            });
        }
        );
};

// export const DeleteCase = (_id) => dispatch => {
//     dispatch(enableCaseLoading());
//     axios
//         .delete(`/api/cases/deleteCases/${_id}`)
//         .then((res) => {
//             dispatch(disableCaseLoading());
//         }
//         )
//         .catch((err) => {
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: err.response.data
//             });
//         });
// };
export const enableChatLoading = () => {
    return {
        type: ENABLE_CHAT_LOADING
    };
};
export const disableChatLoading = () => {
    return {
        type: DISABLE_CHAT_LOADING
    };
};


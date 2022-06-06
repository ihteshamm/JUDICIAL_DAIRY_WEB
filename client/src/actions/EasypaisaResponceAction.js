import axios from "axios";
import { GET_ERRORS } from "./types";
import {
    GET_EASYPAISARESPONCE_DETAILS,
    ENABLE_EASYPAISARESPONCE_LOADING,
    DISABLE_EASYPAISARESPONCE_LOADING,
} from "./types";

export const GetPaymentsRequestsClient = (client) => dispatch => {
    dispatch(enableEasypaisaResponceLoading());
    axios
        .get(`/api/paymentrequests/getPaymentRequestClient/${client}`)
        .then((res) => {

            dispatch({
                type: GET_EASYPAISARESPONCE_DETAILS,
                payload: res.data
            });
            dispatch(disableEasypaisaResponceLoading());
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const deleteEasypaisaResponce = (_id) => dispatch => {
    dispatch(enableEasypaisaResponceLoading());
    axios
        .delete(`/api/EasypaisaResponce/deleteEasypaisaResponce/${_id}`)
        .then((res) => {
            dispatch(disableEasypaisaResponceLoading());
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const addEasypaisaResponce = (requestData) => dispatch => {
    axios
        .post("/api/EasypaisaResponce/addEasypaisaResponce", requestData)
        .then((res) => {
            dispatch({
                type: GET_EASYPAISARESPONCE_DETAILS,
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

// //All the requests send by client will get.
export const getEasypaisaResponce = (id) => dispatch => {
    dispatch(enableEasypaisaResponceLoading());
    axios
        .get(`/api/EasyPaisaResponce/getEasyPaisaResponce/${id}`)
        .then((res) => {

            dispatch({
                type: GET_EASYPAISARESPONCE_DETAILS,
                payload: res.data
            });
            dispatch(disableEasypaisaResponceLoading());
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
export const UpdateStatusPaidByPayment = (_id) => dispatch => {
    dispatch(enableEasypaisaResponceLoading());
    axios
        .put(`/api/paymentrequests/UpdateStatusPaidByPayment/${_id}`)
        .then((res) => {
            dispatch({
                type: GET_EASYPAISARESPONCE_DETAILS,
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


export const enableEasypaisaResponceLoading = () => {
    return {
        type: ENABLE_EASYPAISARESPONCE_LOADING
    };
};
export const disableEasypaisaResponceLoading = () => {
    return {
        type: DISABLE_EASYPAISARESPONCE_LOADING
    };
};
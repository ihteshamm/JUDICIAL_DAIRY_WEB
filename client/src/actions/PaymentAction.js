import axios from "axios";
import { GET_ERRORS } from "./types";
import {
    GET_PAYMENT_DETAILS,
    ENABLE_PAYMENT_LOADING,
    DISABLE_PAYMENT_LOADING,
} from "./types";

export const GetPaymentsRequestsClient = (client) => dispatch => {
    dispatch(enablePaymentLoading());
    axios
        .get(`/api/paymentrequests/getPaymentRequestClient/${client}`)
        .then((res) => {

            dispatch({
                type: GET_PAYMENT_DETAILS,
                payload: res.data
            });
            dispatch(disablePaymentLoading());
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const DeletePaymentRequest = (_id) => dispatch => {
    dispatch(enablePaymentLoading());
    axios
        .delete(`/api/paymentrequests/deletePaymentRequest/${_id}`)
        .then((res) => {
            dispatch(disablePaymentLoading());
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const SendPaymentRequest = (requestData) => dispatch => {
    axios
        .post("/api/paymentrequests/addPaymentRequest", requestData)
        .then((res) => {
            dispatch({
                type: GET_PAYMENT_DETAILS,
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
export const GetPaymentsRequests = (lawyer) => dispatch => {
    dispatch(enablePaymentLoading());
    axios
        .get(`/api/paymentrequests/getPaymentRequest/${lawyer}`)
        .then((res) => {

            dispatch({
                type: GET_PAYMENT_DETAILS,
                payload: res.data
            });
            dispatch(disablePaymentLoading());
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
export const UpdateStatusPaidByEasypaisa = (_id) => dispatch => {
    dispatch(enablePaymentLoading());
    axios
        .put(`/api/paymentrequests/UpdateStatusPaidByEasypaisa/${_id}`)
        .then((res) => {
            dispatch({
                type: GET_PAYMENT_DETAILS,
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

export const UpdateStatusPaidByPayment = (_id) => dispatch => {
    dispatch(enablePaymentLoading());
    axios
        .put(`/api/paymentrequests/UpdateStatusPaidByPayment/${_id}`)
        .then((res) => {
            dispatch({
                type: GET_PAYMENT_DETAILS,
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

export const enablePaymentLoading = () => {
    return {
        type: ENABLE_PAYMENT_LOADING
    };
};
export const disablePaymentLoading = () => {
    return {
        type: DISABLE_PAYMENT_LOADING
    };
};
import axios from "axios";
import { GET_ERRORS } from "./types";
import {
    GET_REVIEW_DETAILS,
    ENABLE_REVIEW_LOADING,
    DISABLE_REVIEW_LOADING,
} from "./types";

export const getMyReviews = (client) => dispatch => {
    dispatch(enableReviewLoading());
    axios
        .get(`/api/reviews/getMyReviews/${client}`)
        .then((res) => {

            dispatch({
                type: GET_REVIEW_DETAILS,
                payload: res.data
            });
            dispatch(disableReviewLoading());
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
export const getLawyerReviews = (Lawyer) => dispatch => {
    dispatch(enableReviewLoading());
    axios
        .get(`/api/reviews/getLawyerReviews/${Lawyer}`)
        .then((res) => {

            dispatch({
                type: GET_REVIEW_DETAILS,
                payload: res.data
            });
            dispatch(disableReviewLoading());
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const addReview = (requestData) => dispatch => {
    axios
        .post("/api/reviews/addreview", requestData)
        .then((res) => {
            dispatch({
                type: GET_REVIEW_DETAILS,
                payload: res.data
            });
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


export const DeleteMyReview = (_id) => dispatch => {
    dispatch(enableReviewLoading());
    axios
        .delete(`/api/reviews/DeleteMyReview/${_id}`)
        .then((res) => {
            dispatch(disableReviewLoading());
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
export const enableReviewLoading = () => {
    return {
        type: ENABLE_REVIEW_LOADING
    };
};
export const disableReviewLoading = () => {
    return {
        type: DISABLE_REVIEW_LOADING
    };
};


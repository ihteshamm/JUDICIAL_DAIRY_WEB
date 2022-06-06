import axios from "axios";
import { GET_ERRORS } from "./types";
import {
    GET_LAW_DETAILS,
    ENABLE_LAW_LOADING,
    DISABLE_LAW_LOADING,
} from "./types";

export const getLaws = () => dispatch => {
    dispatch(enableLawLoading());
    axios
        .get(`/api/dictionary/getLaws`)
        .then((res) => {

            dispatch({
                type: GET_LAW_DETAILS,
                payload: res.data
            });
            dispatch(disableLawLoading());
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const DeleteMyLaw = (_id) => dispatch => {
    dispatch(enableLawLoading());
    axios
    .delete(`/api/dictionary/deleteLaw/${_id}`)
    .then((res) => {
            dispatch(disableLawLoading());
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const AddLaw = (requestData) => dispatch => {
    axios
        .post("/api/dictionary/addLaws", requestData)
        .then((res) => {
            dispatch({
                type: GET_LAW_DETAILS,
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
export const getMyLaws = (lawyer) => dispatch => {
    dispatch(enableLawLoading());
    axios
        .get(`/api/dictionary/getMyLaws/${lawyer}`)
        .then((res) => {

            dispatch({
                type: GET_LAW_DETAILS,
                payload: res.data
            });
            dispatch(disableLawLoading());
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
// //Searching Laws.
export const SearchLaws = (value) => dispatch => {
    dispatch(enableLawLoading());
    axios
        .get(`/api/dictionary/SearchLaws/${value}`)
        .then((res) => {

            dispatch({
                type: GET_LAW_DETAILS,
                payload: res.data
            });
            dispatch(disableLawLoading());
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const enableLawLoading = () => {
    return {
        type: ENABLE_LAW_LOADING
    };
};
export const disableLawLoading = () => {
    return {
        type: DISABLE_LAW_LOADING
    };
};
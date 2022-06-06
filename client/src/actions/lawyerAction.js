import axios from "axios";
import { GET_ERRORS } from "./types";
import {
    GET_LAWYER_DETAILS,
    ENABLE_LAWYER_LOADING,
    DISABLE_LAWYER_LOADING,
} from "./types";

export const getLawyer = () => dispatch => {
    dispatch(enableLawyerLoading());
    axios
        .get(`/api/lawyers/getLawyers`)
        .then((res) => {

            dispatch({
                type: GET_LAWYER_DETAILS,
                payload: res.data
            });
            dispatch(disableLawyerLoading());
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const getLawyerCity = (address) => dispatch => {
    dispatch(enableLawyerLoading());
    axios
        .get(`/api/lawyers/getLawyerCity/${address}`)
        .then((res) => {

            dispatch({
                type: GET_LAWYER_DETAILS,
                payload: res.data
            });
            dispatch(disableLawyerLoading());
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};


export const getCaseClient = (client, lawyer) => dispatch => {
    dispatch(enableLawyerLoading());
    axios
        .get(`/api/cases/getcasesClient/${client}/${lawyer}`)
        .then((res) => {

            dispatch({
                type: GET_LAWYER_DETAILS,
                payload: res.data
            });
            dispatch(disableLawyerLoading());
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
export const getCaseType = (type, lawyer) => dispatch => {
    dispatch(enableLawyerLoading());
    axios
        .get(`/api/cases/getcasesbyType/${type}/${lawyer}`)
        .then((res) => {

            dispatch({
                type: GET_LAWYER_DETAILS,
                payload: res.data
            });
            dispatch(disableLawyerLoading());
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const registerCase = caseData => dispatch => {
    axios
        .post("/api/cases/addcase", caseData)
        .then((res) => {
            dispatch({
                type: GET_LAWYER_DETAILS,
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
export const UpdateCase = (_id, caseData) => dispatch => {
    dispatch(enableLawyerLoading());
    axios
        .put(`/api/cases/UpdateCase/${_id}`, caseData)
        .then((res) => {
            dispatch({
                type: GET_LAWYER_DETAILS,
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

export const DeleteCase = (title) => dispatch => {
    dispatch(enableLawyerLoading());
    axios
        .delete(`/api/cases/deleteCases/${title}`)
        .then((res) => {
            dispatch(disableLawyerLoading());
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const enableLawyerLoading = () => {
    return {
        type: ENABLE_LAWYER_LOADING
    };
};
export const disableLawyerLoading = () => {
    return {
        type: DISABLE_LAWYER_LOADING
    };
};
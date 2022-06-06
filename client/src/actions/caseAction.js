import axios from "axios";
import { GET_ERRORS } from "./types";
import {
    GET_CASE_DETAILS,
    ENABLE_CASE_LOADING,
    DISABLE_CASE_LOADING,
} from "./types";

export const getCase = (lawyer) => dispatch => {
    dispatch(enableCaseLoading());
    axios
        .get(`/api/cases/getcases/${lawyer}`)
        .then((res) => {

            dispatch({
                type: GET_CASE_DETAILS,
                payload: res.data
            });
            dispatch(disableCaseLoading());
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
export const getCase_Client = (client) => dispatch => {
    dispatch(enableCaseLoading());
    axios
        .get(`/api/cases/getcasesClient/${client}`)
        .then((res) => {

            dispatch({
                type: GET_CASE_DETAILS,
                payload: res.data
            });
            dispatch(disableCaseLoading());
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
    dispatch(enableCaseLoading());
    axios
        .get(`/api/cases/getcasesClient/${client}/${lawyer}`)
        .then((res) => {

            dispatch({
                type: GET_CASE_DETAILS,
                payload: res.data
            });
            dispatch(disableCaseLoading());
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
    dispatch(enableCaseLoading());
    axios
        .get(`/api/cases/getcasesbyType/${type}/${lawyer}`)
        .then((res) => {

            dispatch({
                type: GET_CASE_DETAILS,
                payload: res.data
            });
            dispatch(disableCaseLoading());
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const getCaseCourt = (court, lawyer) => dispatch => {
    dispatch(enableCaseLoading());
    axios
        .get(`/api/cases/getcasesbyCourt/${court}/${lawyer}`)
        .then((res) => {

            dispatch({
                type: GET_CASE_DETAILS,
                payload: res.data
            });
            dispatch(disableCaseLoading());
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const registerCase = (caseData) => dispatch => {
    axios
        .post("/api/cases/addcase", caseData)
        .then((res) => {
            dispatch({
                type: GET_CASE_DETAILS,
                payload: res.data
            });
            dispatch(getCase());
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
    dispatch(enableCaseLoading());
    axios
        .put(`/api/cases/UpdateCase/${_id}`, caseData)
        .then((res) => {
            dispatch({
                type: GET_CASE_DETAILS,
                payload: res.data
            });
            dispatch(getCase());
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

export const DeleteCase = (_id) => dispatch => {
    dispatch(enableCaseLoading());
    axios
        .delete(`/api/cases/deleteCases/${_id}`)
        .then((res) => {
            dispatch(disableCaseLoading());
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
export const SendRequest = (requestData) => dispatch => {
    axios
        .post("/api/cases/send-CaseRequest", requestData)
        .then((res) => {
            dispatch({
                type: GET_CASE_DETAILS,
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

export const GetRequests = (lawyer) => dispatch => {
    dispatch(enableCaseLoading());
    axios
        .get(`/api/cases/getRequests/${lawyer}`)
        .then((res) => {

            dispatch({
                type: GET_CASE_DETAILS,
                payload: res.data
            });
            dispatch(disableCaseLoading());
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
export const DeleteRequest = (_id) => dispatch => {
    dispatch(enableCaseLoading());
    axios
        .delete(`/api/cases/deleteRequest/${_id}`)
        .then((res) => {
            dispatch(disableCaseLoading());
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
//All the requests send by client will get.
export const getMyRequest = (client) => dispatch => {
    dispatch(enableCaseLoading());
    axios
        .get(`/api/cases/getClientRequest/${client}`)
        .then((res) => {

            dispatch({
                type: GET_CASE_DETAILS,
                payload: res.data
            });
            dispatch(disableCaseLoading());
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const UpdateStatusRejected = (_id) => dispatch => {
    dispatch(enableCaseLoading());
    axios
        .put(`/api/cases/UpdateStatusRejected/${_id}`)
        .then((res) => {
            dispatch({
                type: GET_CASE_DETAILS,
                payload: res.data
            });
            dispatch(getCase());
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
export const UpdateStatusAccepted = (_id) => dispatch => {
    dispatch(enableCaseLoading());
    axios
        .put(`/api/cases/UpdateStatusAccepted/${_id}`)
        .then((res) => {
            dispatch({
                type: GET_CASE_DETAILS,
                payload: res.data
            });
            dispatch(getCase());
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


export const enableCaseLoading = () => {
    return {
        type: ENABLE_CASE_LOADING
    };
};
export const disableCaseLoading = () => {
    return {
        type: DISABLE_CASE_LOADING
    };
};
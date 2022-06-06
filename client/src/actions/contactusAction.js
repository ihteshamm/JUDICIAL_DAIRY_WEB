import axios from "axios";

import {
    GET_CONTACTUS_ACTION,
    ENABLE_CONTACTUS_ACTION_LOADING,
    GET_ERRORS,
    DISABLE_CONTACTUS_ACTION_LOADING,
} from "./types";

export const getContactusAction = (name) => dispatch => {
    dispatch(enableContactusActionLoading());
    axios
        .get(`/api/contactus/name/${name}`)
        .then((res) => {

            dispatch({
                type: GET_CONTACTUS_ACTION,
                payload: res.data
            });
            dispatch(disableContactusActionLoading());
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
        });
};

export const createContactusAction = contactusActionData => dispatch => {
    axios
        .post("/api/contactus/", contactusActionData)
        .then((res) => {
            dispatch({
                type: GET_CONTACTUS_ACTION,
                payload: res.data
            });
            dispatch(getContactusAction(contactusActionData.block));
        }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            });
            err.response.data.message ? alert(err.response.data.message) : console.log(err);
        }
        );
};

export const enableContactusActionLoading = () => {
    return {
        type: ENABLE_CONTACTUS_ACTION_LOADING
    };
};
export const disableContactusActionLoading = () => {
    return {
        type: DISABLE_CONTACTUS_ACTION_LOADING
    };
};
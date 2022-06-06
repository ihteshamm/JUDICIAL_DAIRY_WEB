import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import { GET_CURRENT_LAWYER } from "./types";
import { SET_CURRENT_LAWYER } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Register Contact us
export const registerContactUs = (userData, history) => dispatch => {
  axios
    .post("/api/contactus/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// log out user
export const logoutUser = history => dispatch => {
  // remove token from localstorage
  localStorage.removeItem("jwtToken");
  // reomve auth header for future requests
  setAuthToken(false);
  // set current user to {} and isAuthenticated to false
  dispatch(setCurrentUser({}));
  if (history) history.push("/");
  else window.location.href = "/";
};

// Get current User data
export const getCurrentUser = () => dispatch => {
  axios
    .post("api/users/current")
    .then(res => {
      dispatch({
        type: SET_CURRENT_USER,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get current User data
export const MyProfile = (lawyer) => dispatch => {
  axios
    .get(`/api/lawyers/MyProfile/${lawyer}`)
    .then(res => {
      dispatch({
        type: GET_CURRENT_LAWYER,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Register Lawyer
export const registerLawyer = (lawyerData, history) => dispatch => {
  axios
    .post("/api/lawyers/register", lawyerData)
    .then(res => history.push("/Lawyer_login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const UpdateLawyer = (_id, lawyerData) => dispatch => {
  axios
      .put(`/api/lawyers/UpdateLawyer/${_id}`, lawyerData)
      .then((res) => {
          dispatch({
              type: SET_CURRENT_LAWYER,
              payload: res.data
          });
//          dispatch(getCase());
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


// Login - get lawyer token
export const loginLawyer = lawyerData => dispatch => {
  axios
    .post("api/lawyers/login", lawyerData)
    .then(res => {
      // save to localstorage
      const { token } = res.data;
      // set token to localstorage
      localStorage.setItem("jwtToken", token);
      // set token to Auth header
      setAuthToken(token);
      // Decode token to get lawyer data
      const decoded = jwt_decode(token);
      // set current lawyer
      dispatch(setCurrentLawyer(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("api/users/login", userData)
    .then(res => {
      // save to localstorage
      const { token } = res.data;
      // set token to localstorage
      localStorage.setItem("jwtToken", token);
      // set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// set logged in Lawyer
export const setCurrentLawyer = decoded => {
  return {
    type: SET_CURRENT_LAWYER,
    payload: decoded
  };
};

// log out Lawyer
export const logoutLawyer = history => dispatch => {
  // remove token from localstorage
  localStorage.removeItem("jwtToken");
  // reomve auth header for future requests
  setAuthToken(false);
  // set current Lawyer to {} and isAuthenticated to false
  dispatch(setCurrentLawyer({}));
  if (history) history.push("/");
  else window.location.href = "/";
};
// Get current Lawyer data
export const getCurrentLawyer = () => dispatch => {
  axios
    .post("api/lawyers/current")
    .then(res => {
      dispatch({
        type: SET_CURRENT_LAWYER,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


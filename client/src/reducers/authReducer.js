import isEmpty from "../validation/is-empty";
import { SET_CURRENT_USER, GET_CURRENT_USER } from "../actions/types";
import { SET_CURRENT_LAWYER, GET_CURRENT_LAWYER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  lawyer: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case GET_CURRENT_USER:
      return {
        ...state,
        user: action.payload
      };
        case SET_CURRENT_LAWYER:
          return {
            ...state,
            isAuthenticated: !isEmpty(action.payload),
            lawyer: action.payload
          };
        case GET_CURRENT_LAWYER:
          return {
            ...state,
            lawyer: action.payload
          };
    default:
      return state;
  }
}



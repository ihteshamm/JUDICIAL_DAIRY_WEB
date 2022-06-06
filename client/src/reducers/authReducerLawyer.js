import isEmpty from "../validation/is-empty";
import { SET_CURRENT_LAWYER, GET_CURRENT_LAWYER } from "../actions/types";
import { GET_LAWYER_DETAILS, ENABLE_LAWYER_LOADING, DISABLE_LAWYER_LOADING } from "../actions/types";

const initialState = {
  lawyerData: [],
  loading: false,
  isAuthenticated: false,
  lawyer: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
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
      case GET_LAWYER_DETAILS:
        return {
            ...state,
            lawyerData: action.payload,
        };
    case ENABLE_LAWYER_LOADING:
        return {
            ...state,
            loading: true,
        }
    case DISABLE_LAWYER_LOADING:
        return {
            ...state,
            loading: false,
        }
    default:
      return state;
  }
}

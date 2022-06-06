import { GET_REVIEW_DETAILS, ENABLE_REVIEW_LOADING, DISABLE_REVIEW_LOADING } from "../actions/types";

const initialState = {
  reviewData: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
      case GET_REVIEW_DETAILS:
          return {
              ...state,
              reviewData: action.payload,
          };
      case ENABLE_REVIEW_LOADING:
          return {
              ...state,
              loading: true,
          }
      case DISABLE_REVIEW_LOADING:
          return {
              ...state,
              loading: false,
          }
      default:
          return state;
  }
}


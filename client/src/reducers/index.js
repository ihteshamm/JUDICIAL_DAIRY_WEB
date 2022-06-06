import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import caseReducer from "./caseReducer";
import lawyerReducer from "./authReducerLawyer";
import authReducerlawyer from "./authReducerLawyer";
import PaymentRequestReducer from "./PaymentRequestReducer";
import ChatReducer from "./chatReducer";
import EasypaisaResponceReducer from "./EasypaisaResponceReducer";
import reviewReducer from "./reviewReducer";
import dictionaryReducer from "./dictionaryReducer";

export default combineReducers({
  auth: authReducer,
  authlawyer: authReducerlawyer,
  errors: errorReducer,
  caseData: caseReducer,
  lawyerData: lawyerReducer,
  paymentData:PaymentRequestReducer,
  reviewData:reviewReducer,
  chatData:ChatReducer,
  EasypaisaData:EasypaisaResponceReducer,
  dictionaryData: dictionaryReducer,
});

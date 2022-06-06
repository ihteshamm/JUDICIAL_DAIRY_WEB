const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.requestID = !isEmpty(data.requestID) ? data.requestID : "";
  data.lawyername = !isEmpty(data.lawyername) ? data.lawyername : "";
  data.transitionID = !isEmpty(data.transitionID) ? data.transitionID : "";
  data.date = !isEmpty(data.date) ? data.date : "";
  data.clientEasypisaName = !isEmpty(data.clientEasypisaName) ? data.clientEasypisaName : "";
  data.clientEasypaisaNumber = !isEmpty(data.clientEasypaisaNumber) ? data.clientEasypaisaNumber : "";
  if (Validator.isEmpty(data.transitionID)) {
    errors.transitionID = "Transition-ID Field is Required";
  }
  if (Validator.isEmpty(data.date)) {
    errors.date = "Date is required.";
  }
  if (Validator.isEmpty(data.clientEasypisaName)) {
    errors.clientEasypisaName = "Name Field is Required";
  }
  if (Validator.isEmpty(data.clientEasypaisaNumber)) {
    errors.clientEasypaisaNumber = "Transition-ID Field is Required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

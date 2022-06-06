const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.lawyer = !isEmpty(data.lawyer) ? data.lawyer : "";
  data.client = !isEmpty(data.client) ? data.client : "";
  data.case = !isEmpty(data.case) ? data.case : "";
  data.amount = !isEmpty(data.amount) ? data.amount : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  if (Validator.isEmpty(data.amount)) {
    errors.amount = "Amount Field is Required";
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = "Description is required.";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

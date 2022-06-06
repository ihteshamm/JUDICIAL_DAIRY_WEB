const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  data.type = !isEmpty(data.type) ? data.type : "";
  data.code = !isEmpty(data.code) ? data.code : "";
  data.client = !isEmpty(data.client) ? data.client : "";
  data.lawyer = !isEmpty(data.lawyer) ? data.lawyer : "";
  data.court = !isEmpty(data.court) ? data.court : "";
  data.hearingDate = !isEmpty(data.hearingDate) ? data.hearingDate : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  if (!Validator.isLength(data.title, { min: 2, max: 30 })) {
    errors.name = "Title must be between 2 and 30 Characters";
  }
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title is Required";
  }

  if (Validator.isEmpty(data.type)) {
    errors.type = "Case Type is Required";
  }
  if (Validator.isEmpty(data.code)) {
    errors.code = "Code is invalid";
  }

  if (Validator.isEmpty(data.client)) {
    errors.client = "client Field is Required";
  }
  if (Validator.isEmpty(data.court)) {
    errors.court = "Court Field is required.";
  }
  if (Validator.isEmpty(data.hearingDate)) {
    errors.hearingDate = "Hearing Date is required.";
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = "Description is required.";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

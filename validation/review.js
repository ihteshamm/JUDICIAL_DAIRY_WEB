const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.client = !isEmpty(data.client) ? data.client : "";
  data.lawyer = !isEmpty(data.lawyer) ? data.lawyer : "";  
  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.ratings = !isEmpty(data.ratings) ? data.ratings : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title  is required.";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "description  is required.";
  }
  if (Validator.isEmpty(data.ratings)) {
    errors.ratings = "Ratings  is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

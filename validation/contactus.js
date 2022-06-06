const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 Characters";
  }

  if (!Validator.isAlphanumeric(data.name)) {
    errors.name = "Only Alphabets and numbers Allowed.";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name Field is Required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email Field is Required";
  }


  if (Validator.isEmpty(data.title)) {
    errors.title = "title is required.";
  }


  if (Validator.isEmpty(data.description)) {
    errors.description = "description  is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

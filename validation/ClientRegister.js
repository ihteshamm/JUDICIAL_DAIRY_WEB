const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.contact = !isEmpty(data.contact) ? data.contact : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 Characters";
  }
  if (!Validator.isAlphanumeric(data.address)) {
    errors.address = "Only Alphabets and numbers Allowed.";
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = "address Field is Required";
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

  if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = "Password must be 8 characters long";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required.";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Password must be same";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password is required.";
  }
  if (Validator.isEmpty(data.contact)) {
    errors.password2 = "Contact number is required.";
  }
  if (Validator.isEmpty(data.gender)) {
    errors.password2 = "Gender is required.";
  }
  if (!Validator.isAlphanumeric(data.gender)) {
    errors.name = "Only Alphabets Allowed.";
  }
  if (!Validator.isAlphanumeric(data.contact)) {
    errors.name = "Only numbers Allowed.";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  data.letter = !isEmpty(data.letter) ? data.letter : "";
  data.permalink = !isEmpty(data.permalink) ? data.permalink : "";
  data.body = !isEmpty(data.body) ? data.body : "";
  data.published_at = !isEmpty(data.published_at) ? data.published_at : "";
  data.source = !isEmpty(data.source) ? data.source : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title is Required";
  }
  if (!Validator.isLength(data.letter, { min: 1, max: 1 })) {
    errors.name = "letter must be 1 Alphabet";
  }

  if (Validator.isEmpty(data.body)) {
    errors.body = "body is Required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

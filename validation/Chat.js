const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.message = !isEmpty(data.message) ? data.message : "";
  data.sender = !isEmpty(data.sender) ? data.sender : "";
  data.reciever = !isEmpty(data.reciever) ? data.reciever : "";
  data.date = !isEmpty(data.date) ? data.date : "";
  if (Validator.isEmpty(data.message)) {
    errors.message = "Empty message";
  }
  if (Validator.isEmpty(data.date)) {
    errors.date = "Empty Sender";
  }

  if (Validator.isEmpty(data.sender)) {
    errors.sender = "Empty Sender";
  }
  if (Validator.isEmpty(data.reciever)) {
    errors.reciever = "Empty Reciever";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

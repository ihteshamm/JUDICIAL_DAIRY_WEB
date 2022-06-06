const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const EasypaisaResponceSchema = new Schema({
  requestID: {
    type: String,
    required: true
  },
  lawyername: {
    type: String,
    required: true
  },
  transitionID: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  clientEasypisaName: {
    type: String,
    required: true
  },
  clientEasypaisaNumber: {
    type: String,
    required: true
  }
});
module.exports = EasypaisaResponce = mongoose.model("EasypaisaResponces", EasypaisaResponceSchema);
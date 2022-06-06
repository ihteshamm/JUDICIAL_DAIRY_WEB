const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PaymentRequestSchema = new Schema({
  lawyer_ID: {
    type: String,
    required: true
  },
  lawyer: {
    type: String,
    required: true
  },
  client: {
    type: String,
    required: true
  },
  case: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  easypaisaname: {
    type: String,
    required: true
  },
  easypaisanumber: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: true,
  },
});
module.exports = PaymentRequest = mongoose.model("paymentrequests", PaymentRequestSchema);
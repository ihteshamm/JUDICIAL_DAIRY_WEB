const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CaseRequestSchema = new Schema({
  client: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  court: {
    type: String,
    required: true
  },
  lawyer: {
    type: String,
    required: true
  },
  hearingDate: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
});
module.exports = CaseRequest = mongoose.model("caserequests", CaseRequestSchema);
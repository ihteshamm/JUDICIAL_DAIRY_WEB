const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LawyerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  fee: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  court: {
    type: String,
    required: true
  },
  experiance: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },

});
module.exports = Laywer = mongoose.model("lawyers", LawyerSchema);

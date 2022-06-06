const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ReviewSchema = new Schema({
  client: {
    type: String,
    required: true
  },
  lawyer: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ratings: {
    type: String,
    required: true
  }
});

module.exports = Review = mongoose.model("reviews", ReviewSchema);

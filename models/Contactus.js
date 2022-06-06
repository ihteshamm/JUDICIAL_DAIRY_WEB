const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ContactusSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
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
  }
});

module.exports = Contactus = mongoose.model("contactuss", ContactusSchema);

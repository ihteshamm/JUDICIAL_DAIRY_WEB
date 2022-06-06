const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const DictionarySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  letter: {
    type: String,
    required: true
  },
  permalink: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  published_at: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  name: {
    type: String,
  }
});
module.exports = Dictionary = mongoose.model("dictionarys", DictionarySchema);
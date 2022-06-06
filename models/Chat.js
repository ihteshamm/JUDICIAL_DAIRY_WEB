const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ChatSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    reciever: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});
module.exports = Chat = mongoose.model("chats", ChatSchema);

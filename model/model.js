const mongoose = require('mongoose'); // If using a database

const MessageSchema = new mongoose.Schema({
  message: String,
  name: String,
  email: String,
});

const RequestSchema = new mongoose.Schema({
  fullName: String,
  tel: String,
  email: String,
});

const Message = mongoose.model('Message', MessageSchema);
const Request = mongoose.model('Request', RequestSchema);

module.exports = { Message, Request };

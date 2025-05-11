const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  token: { type: String, default: '' } // Store JWT token if needed
});

const hiveSchema = new mongoose.Schema({
  userapi: { type: String, required: true, unique: true }, // Unique API key for each user
  members: [memberSchema] // Array of members
});

const Hive = mongoose.model('Hive', hiveSchema);

module.exports = Hive;

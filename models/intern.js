const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const bcrypt = require("bcrypt");

// Define the intern schema
const internSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
});

// Create Intern model
module.exports = mongoose.model("Intern", internSchema);
//module.exports = Intern;

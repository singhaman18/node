const mongoose = require("mongoose");
require('dotenv').config();

// Define the MongoDB connection URL
//const mongoURL = process.env.MOGODB_URL_LOCAL;
const mongoURL = process.env.MONGODB_URL;

// Set up MongoDB connection
mongoose.connect(mongoURL, {});

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection;

// Define event listeners for database connection
db.on("connected", () => {
  console.log("Connected to MongoDB server...");
});

db.on("error", (error) => {
  console.log("MongoDB connection erroe...: ", error);
});

db.on("disconnected", () => {
  console.log("MongoDB server Disconnected...");
});

// Export the database connection
module.exports = db;

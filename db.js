const mongoose = require("mongoose");

// Define the MongoDB connection URL
const mongoURL = "mongodb://localhost:27017/hotels";

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

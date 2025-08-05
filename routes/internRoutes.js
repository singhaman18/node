const express = require("express");
const router = express.Router();
const Intern = require("../models/intern");
const multer = require("multer");

// Set up multer to store files in uploads folder
/*
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const suffix = Date.now();
    cb(null, suffix + "-" + file.originalname);
  },
});
*/

// Configure the multer to store files in memory as Buffer
const storage = multer.memoryStorage();

const upload = multer({ storage });

router.post("/create", upload.single("photo"), async (req, res) => {
  try {
    const { name, age, mobile, email, address } = req.body;
    //const photopath = req.file ? req.file.path : null;
    const photoBase64 = req.file ? req.file.buffer.toString("base64") : null;
    const newIntern = new Intern({
      name,
      age,
      mobile,
      email,
      address,
      photo: photoBase64,
    });

    await newIntern.save();
    res
      .status(200)
      .json({ message: "Intern created successfully...", intern: newIntern });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error..." });
  }
});

module.exports = router;

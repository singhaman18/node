const express = require("express");
const router = express.Router();
const menuItem = require("./../models/menu");

router.post("/", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the person data

    //Create a new menu document using the Mongoose model
    const newMenu = new menuItem(data);

    // Save the menu to the database
    const response = await newMenu.save();
    console.log("Data saved successfully");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await menuItem.find();
    console.log("Data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType; // Extract the taste type from the URL parameter
    if (tasteType == "sweet" || tasteType == "sour" || tasteType == "spicy") {
      const response = await menuItem.find({ taste: tasteType });
      console.log("Response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update

// Delete

module.exports = router;

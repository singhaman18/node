const express = require("express");
const router = express.Router();
const Person = require("./../models/person");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");

// POST route to add a person
router.post("/signup", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the person data

    //Create a new Person document using the Mongoose model
    const newPerson = new Person(data);

    // Save the new person to the database
    const response = await newPerson.save();
    console.log("Data saved successfully");

    const payload = {
      id: response.id,
      username: response.username,
    };
    console.log(JSON.stringify(payload));

    const token = generateToken(payload);
    console.log("Token is: ", token);

    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    //Extract the username and password from req body
    const { username, password } = req.body;

    //find the user by username
    const user = await Person.findOne({ username: username });

    //If user does not exist or password does not match, return error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // generate tokens
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);

    // return token as response
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Profile route
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log("User data: ", userData);

    const userId = userData.id;
    const user = await Person.findById(userId);

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get method to get the person
router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; // Extract the work type from the URL parameter
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
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

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //Extract the id from the URL parameter
    const updatedPersonData = req.body; // Updated data for the person

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // Return the updated doc
        runValidators: true, // Run Mongoose validation
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("Data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("Data deleted");
    res.status(200).json({ message: "Person deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

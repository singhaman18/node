// var fs = require("fs");
// var os = require("os");

// var user = os.userInfo();
// console.log(user.username);

// fs.appendFile("greeting.txt", "Hi " + user.username + "!\n", () => {
//   console.log("File created");
// });

// console.log(os);
// console.log(fs);

// const notes = require("./notes.js");
// var _ = require("lodash");

// var age = notes.age;
// console.log(age);

// var result = notes.addNumber(age + 10, 9);
// console.log(result);

// var data = ["person", "person", 1, 2, 1, 2, "name", "age", "2"];
// var filter = _.uniq(data);
// console.log(filter);

// console.log(_.isString('prince'));
// console.log(_.isString(3));

// ---------------------------------------------------------------------- //
// const jsonString = '{"name": "Aman", "age": 21, "city": "New York"}';
// const jsonObject = JSON.parse(jsonString);
// console.log(jsonObject.name);

// const objectToConvert = {
//   name: "Alex",
//   age: 21,
// };
// const jsonStringified = JSON.stringify(objectToConvert);
// console.log(jsonStringified);

// const express = require("express");
// const app = express();

// app.get("/", (req, res) => {
//   res.send(
//     "Welcome to our hotel... What can I get you?<br>Here is the list of menu<br>.chicken<br>.idli"
//   );
// });

// app.get("/chicken", (req, res) => {
//   res.send("Sure sir, I can serve you chicken!");
// });

// app.get("/idli", (req, res) => {
//   var customized_idli = {
//     name: "rava idli",
//     size: "10cm diameter",
//     is_sambhar: true,
//     is_chutney: false,
//   };
//   res.send(customized_idli)
//   res.send("Sure sir, I can serve you idli!");
// });

// app.listen(3000, () => {
//   console.log("Listening on port 3000");
// });
// ---------------------------------------------------------------------- //
// const express = require("express");
// const app = express();

// app.get("/", (req, res) => {
//   res.send(
//     "Welcome to our hotel... What can I get you?<br>Here is the list of menu<br>.chicken<br>.idli"
//   );
// });

// app.get("/chicken", (req, res) => {
//   res.send("Sure sir, I can serve you chicken!");
// });

// app.get("/idli", (req, res) => {
//   var customized_idli = {
//     name: "rava idli",
//     size: "10cm diameter",
//     is_sambhar: true,
//     is_chutney: false,
//   };
//   res.send(customized_idli)
//   res.send("Sure sir, I can serve you idli!");
// });

// app.post("/items",(req,res) => {
//     res.send("Data is saved...")
// })

// app.listen(3000, () => {
//   console.log("Listening on port 3000");
// });
// ---------------------------------------------------------------------- //
// const express = require("express");
// const app = express();
// const db = require("./db");
// const Person = require("./models/person");
// const bodyParser = require("body-parser");
// app.use(bodyParser.json());
// const menuItem = require("./models/menu");

// app.get("/", (req, res) => {
//   res.send("Welcome to our hotel!");
// });

// app.post("/person", async (req, res) => {
//   try {
//     const data = req.body; // Assuming the request body contains the person data

//     //Create a new Person document using the Mongoose model
//     const newPerson = new Person(data);
//     //   newPerson.name = data.name;
//     //   newPerson.age = data.age;
//     //   newPerson.mobile = data.mobile;
//     //   newPerson.email = data.email;
//     //   newPerson.address = data.address;
//     //   newPerson.salary = data.salary;

//     // Save the new person to the database
//     const response = await newPerson.save();
//     console.log("Data saved successfully");
//     res.status(200).json(response);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Get method to get the person
// app.get("/person", async (req, res) => {
//   try {
//     const data = await Person.find();
//     console.log("Data fetched");
//     res.status(200).json(data);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.post("/menu", async (req, res) => {
//   try {
//     const data = req.body; // Assuming the request body contains the person data

//     //Create a new menu document using the Mongoose model
//     const newMenu = new menuItem(data);

//     // Save the  menu to the database
//     const response = await newMenu.save();
//     console.log("Data saved successfully");
//     res.status(200).json(response);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.get("/menu", async (req, res) => {
//   try {
//     const data = await menuItem.find();
//     console.log("Data fetched");
//     res.status(200).json(data);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.listen(3000, () => {
//   console.log("Listening on port 3000");
// });
// ---------------------------------------------------------------------- //
const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to our hotel!");
});

// Import the router files
const personRoutes = require("./routes/personRoutes");
// Use the routers
app.use("/person", personRoutes);

const menuRoutes = require("./routes/menuRoutes");
app.use("/menu", menuRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
// ---------------------------------------------------------------------- //

// import the pets array from data.js
const pets = require("./data");

// init express app
const express = require("express");
const app = express();

const PORT = 8080;

// GET - / - returns homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// hello world route
app.get("/api", (req, res) => {
  res.send("Hello World!");
});

// get all pets from the database
app.get("/api/v1/pets", (req, res) => {
  res.json({ pets: petsData });
});

// get pet by owner with query string
app.get("/api/v1/pets/owner", (req, res) => {
  // get the owner from the query string
  const owner = req.query.owner;

  // validate that the owner is provided
  if (!owner) {
    return res
      .status(400)
      .json({ error: "Owner parameter is required in the query string" });
  }

  // find the pet in the pets array
  const pet = pets.find((pet) => pet.owner === owner);

  // send the pet as a response
  if (pet) {
    res.json({ pet });
  } else {
    res.status(404).json({ error: "Pet not found for the given owner" });
  }
});

// GET - /api/v1/pets/:name - get pet by name
app.get("/api/v1/pets/:name", (req, res) => {
  // get the name from the request parameters
  const name = req.params.name;

  // find the pet in the pets array
  const pet = pets.find((pet) => pet.name === name);

  // send the pet as a response
  if (pet) {
    res.json({ pet });
  } else {
    res.status(404).json({ error: "Pet not found for the given name" });
  }
});

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

module.exports = app;

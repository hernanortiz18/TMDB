const express = require("express");
const registerRoute = express.Router();
const User = require("../models/Users");

registerRoute.post("/", (req, res) => {
  User.create(req.body).then((newUser) => {
    console.log("NUEVO USUARIO CREADO -->", newUser);
    res.status(201).send(newUser);
  });
});

module.exports = registerRoute;

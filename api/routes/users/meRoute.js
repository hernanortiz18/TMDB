const express = require("express");
const meRoute = express.Router();
const validateUser = require("../../middlewares/auth");

meRoute.get("/", validateUser, (req, res) => {
  res.status(202).send(req.user);
});

module.exports = meRoute;

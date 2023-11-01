const express = require("express");
const loginRoute = express.Router();
const User = require("../../models/Users");
const { generateToken } = require("../../config/tokens");

loginRoute.post("/", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } }).then((user) => {
    if (!user) return res.sendStatus(401);
    user.passwordValidate(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);
      const payload = {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      };
      const token = generateToken(payload);
      res.status(202).cookie("token", token).send(payload);
    });
  });
});

module.exports = loginRoute;

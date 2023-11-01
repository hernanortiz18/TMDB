const express = require("express");
const User = require("../models/Users");
const userRouter = express.Router();
const userRegister = require("./userRegister");

//new user register

userRouter.use("/register", userRegister);

userRouter.get("/", (req, res) => {
  User.findAll()
    .then((allUsers) => {
      res.status(200).send(allUsers);
    })
    .catch((Error) => console.log(Error));
});

module.exports = userRouter;

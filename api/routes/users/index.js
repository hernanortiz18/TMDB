const express = require("express");
const User = require("../../models/Users");
const userRouter = express.Router();
const registerRoute = require("./registerRoute");
const loginRoute = require("./loginRoute");
const meRoute = require("./meRoute");

//new user register

userRouter.use("/register", registerRoute);
userRouter.use("/login", loginRoute);
userRouter.use("/me", meRoute);

userRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

userRouter.get("/", (req, res) => {
  User.findAll()
    .then((allUsers) => {
      res.status(200).send(allUsers);
    })
    .catch((Error) => console.log(Error));
});

module.exports = userRouter;

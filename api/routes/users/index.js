const express = require("express");
const User = require("../../models/Users");
const userRouter = express.Router();
const registerRoute = require("./registerRoute");
const loginRoute = require("./loginRoute");
const meRoute = require("./meRoute");
const { recoverPass } = require("../../utils/mailer");

//new user register

userRouter.use("/register", registerRoute);
userRouter.use("/login", loginRoute);
userRouter.use("/me", meRoute);

userRouter.get("/emailValidate", (req, res) => {
  const { email } = req.query;
  User.findOne({
    where: { email: email },
  })
    .then((user) => {
      if (!user) return res.sendStatus(401);
      else return recoverPass(email);
    })
    .then(() => res.status(200).send(email))
    .catch(() => res.send(false));
});

userRouter.put("/updatePass", (req, res) => {
  const { email } = req.query;
  const { password } = req.body;
  User.update(
    {
      email,
    },
    { where: { email }, returning: true, plain: "text" }
  )
    .then(([rows, user]) => {
      res.status(201).send(user);
    })
    .catch((error) => console.log(error));
});

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

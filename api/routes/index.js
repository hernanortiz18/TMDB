const express = require("express");
const userRouter = require("./users");
const routerMovies = require("./movies");
const validateUser = require("../middlewares/auth");
const router = express.Router();

router.use("/users", userRouter);
router.use("/movies", routerMovies);

router.get("/me", validateUser, (req, res) => {
  res.status(202).send(req.user);
});

router.use("/", (req, res) => {
  res.sendStatus(200);
});

module.exports = router;

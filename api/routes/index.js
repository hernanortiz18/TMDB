const express = require("express");
const userRouter = require("./users");
const routerMovies = require("./movies");
const routerTv = require("./tv");
const validateUser = require("../middlewares/auth");
const router = express.Router();
const apiURL = process.env.API_URL;
const apiKey = process.env.API_KEY;

router.use("/users", userRouter);
router.use("/movies", routerMovies);
router.use("/tv", routerTv);

router.get("/me", validateUser, (req, res) => {
  res.status(202).send(req.user);
});

router.get("/search", (req, res) => {
  const options = req.query;
  axios.get(`${apiURL}/movies/`);
});

router.use("/", (req, res) => {
  res.sendStatus(200);
});

module.exports = router;

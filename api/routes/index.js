const express = require("express");
const S = require("sequelize");
const axios = require("axios");
const userRouter = require("./users");
const routerMovies = require("./movies");
const routerTv = require("./tv");
const ratingRoute = require("./rating");
const favsRoute = require("./favs");
const { sendEmail } = require("../utils/mailer");
const validateUser = require("../middlewares/auth");
const User = require("../models/Users");
const Favs = require("../models/Favs");
const router = express.Router();
const apiURL = process.env.API_URL;
const apiKey = process.env.API_KEY;

router.use("/users", userRouter);
router.use("/movies", routerMovies);
router.use("/tv", routerTv);
router.use("/rating", ratingRoute);
router.use("/favs", favsRoute);

router.get("/me", validateUser, (req, res) => {
  res.status(202).send(req.user);
});

router.get("/search", async (req, res) => {
  const { title } = req.query;
  axios
    .get(`${apiURL}/search/multi`, {
      params: { api_key: apiKey, query: title },
    })
    .then((result) => {
      res.send(result.data.results);
      console.log(result.data.results);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/:type/:id", (req, res) => {
  const { id, type } = req.params;
  axios
    .get(`${apiURL}/${type}/${id}`, { params: { api_key: apiKey } })
    .then((movie) => res.send(movie.data))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.post("/favRegister", (req, res) => {
  Favs.create(req.body).then(() => res.sendStatus(201));
});

router.delete("/favDelete", (req, res) => {
  const { authorUserId } = req.query;
  Favs.destroy({
    where: { authorUserId: authorUserId },
  }).then(() => console.log("deleted"));
});

router.use("/", (req, res) => {
  res.sendStatus(200);
});

module.exports = router;

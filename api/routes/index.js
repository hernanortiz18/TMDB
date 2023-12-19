const express = require("express");
const S = require("sequelize");
const axios = require("axios");
const userRouter = require("./users");
const routerMovies = require("./movies");
const routerTv = require("./tv");
const ratingRoute = require("./rating");
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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  axios
    .get(`${apiURL}/movie/${id}`, { params: { api_key: apiKey } })
    .then((movie) => res.send(movie.data))
    .catch(() => {
      axios
        .get(`${apiURL}/tv/${id}`, { params: { api_key: apiKey } })
        .then((tvShow) => res.send(tvShow.data));
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

router.get("/favs/all", (req, res) => {
  const { authorUserId } = req.query;
  const { type } = req.query;
  Favs.findAll({ where: { authorUserId: authorUserId } })
    .then((response) => {
      const promesas = response.map((item) => {
        return axios.get(`${apiURL}/${type}/${item.selectedFavId}`, {
          params: { api_key: apiKey },
        });
      });
      return Promise.all(promesas);
    })
    .then((result) => {
      console.log(result);
      return result.map((movie) => movie.data);
    })
    .then((promisesResult) => {
      res.status(200).send(promisesResult);
    })
    .catch((error) => console.log(error));
});

router.get("/favs/:id", (req, res) => {
  const selectedFavId = req.params.id;
  const { authorUserId } = req.body;
  Favs.findOne({
    where: { selectedFavId, authorUserId },
    rejectOnEmpty: true,
  })
    .then(() => res.send(true))
    .catch(S.ResultError, (err) => res.send(false))
    .catch((error) => console.log(error));
});

router.use("/", (req, res) => {
  res.sendStatus(200);
});

module.exports = router;

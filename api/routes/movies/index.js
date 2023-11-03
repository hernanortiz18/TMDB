const express = require("express");
const routerMovies = express.Router();
const axios = require("axios");
const apiKey = "3bf84b63cc8ea1c1d15a4a65475f2a4c";
const apiURL = "https://api.themoviedb.org/3";

routerMovies.get("/", (req, res) => {
  axios
    .get(`${apiURL}/discover/movie`, { params: { api_key: apiKey } })
    .then((user) => res.send(user.data.results));
});

module.exports = routerMovies;

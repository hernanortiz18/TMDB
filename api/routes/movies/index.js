const express = require("express");
const routerMovies = express.Router();
const axios = require("axios");
require("dotenv").config();

const apiURL = process.env.API_URL;
const apiKey = process.env.API_KEY;

routerMovies.get("/trending", (req, res) => {
  axios
    .get(`${apiURL}/trending/movie/week`, { params: { api_key: apiKey } })
    .then((movies) => res.status(200).send(movies.data.results));
});
routerMovies.get("/", (req, res) => {
  axios
    .get(`${apiURL}/discover/movie`, { params: { api_key: apiKey } })
    .then((movies) => res.send(movies.data.results));
});

module.exports = routerMovies;

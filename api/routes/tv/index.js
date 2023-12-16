const express = require("express");
const tvRouter = express.Router();
const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.API_KEY;
const apiURL = process.env.API_URL;

tvRouter.get("/trending", (req, res) => {
  axios
    .get(`${apiURL}/trending/tv/week`, { params: { api_key: apiKey } })
    .then((movies) => res.status(200).send(movies.data.results));
});
tvRouter.get("/", (req, res) => {
  axios
    .get(`${apiURL}/discover/tv`, {
      params: {
        api_key: apiKey,
      },
    })

    .then((user) => res.send(user.data.results));
});

module.exports = tvRouter;

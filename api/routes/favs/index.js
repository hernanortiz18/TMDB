const express = require("express");
const favsRouter = express.Router();
const Favs = require("../../models/Favs");
const axios = require("axios");
require("dotenv").config();
const apiURL = process.env.API_URL;
const apiKey = process.env.API_KEY;

favsRouter.get("/all", (req, res) => {
  const { authorUserId, type } = req.query;
  Favs.findAll({ where: { authorUserId: authorUserId, type: type } })
    .then((response) => {
      const promesas = response.map((item) => {
        return axios.get(
          `${apiURL}/${type}/${item.selectedFavId}?api_key=${apiKey}`
        );
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
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

favsRouter.get("/:id", (req, res) => {
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

module.exports = favsRouter;

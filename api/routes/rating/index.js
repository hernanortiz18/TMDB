const express = require("express");
const ratingRoute = express.Router();
const Rating = require("../../models/Rating");

ratingRoute.get("/", (req, res) => {
  const { userId, audiovisual_production_Id, ranked } = req.query;
  Rating.findOrCreate({
    where: { userId, audiovisual_production_Id, ranked },
    defaults: { userId, audiovisual_production_Id },
  })
    .then(([find, created]) => {
      res.send(created);
    })
    .catch((error) => console.log(error));
});

ratingRoute.post("/update", (req, res) => {
  const { userId, audiovisual_production_Id, ranked } = req.body;
  Rating.update(
    {
      ranked,
      userId,
      audiovisual_production_Id,
    },
    {
      where: { userId, audiovisual_production_Id },
      returning: true,
      plain: true,
    }
  )
    .then(([rows, rated]) => {
      res.status(201).send(rated);
    })
    .catch((error) => console.log(error));
});

module.exports = ratingRoute;

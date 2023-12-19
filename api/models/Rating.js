const S = require("sequelize");
const db = require("../config/db");

class Rating extends S.Model {}

Rating.init(
  {
    ranked: {
      type: S.STRING,
      defaultValue: "0",
    },
    audiovisual_production_Id: {
      type: S.INTEGER,
    },
  },
  { sequelize: db, modelName: "rating" }
);

module.exports = Rating;

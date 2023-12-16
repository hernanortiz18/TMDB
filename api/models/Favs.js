const S = require("sequelize");
const db = require("../config/db");

class Favs extends S.Model {}

Favs.init(
  {
    selectedFavId: {
      type: S.INTEGER,
    },
  },
  { sequelize: db, modelName: "fav" }
);

module.exports = Favs;

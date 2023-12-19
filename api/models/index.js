const Favs = require("./Favs");
const Users = require("./Users");
const Rating = require("./Rating");

Favs.belongsTo(Users, { as: "authorUser" });
Rating.belongsTo(Users, { as: "user" });

module.exports = { Users, Favs };

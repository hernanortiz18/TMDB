const Favs = require("./Favs");
const Users = require("./Users");

Favs.belongsToMany(Users, { as: "authorUser" });

module.exports = { Users, Favs };

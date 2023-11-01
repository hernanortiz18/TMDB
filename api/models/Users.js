const S = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt");

class User extends S.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }

  passwordValidate(password) {
    return this.hash(password, this.salt)
      .then((hash) => hash === this.password)
      .catch((Error) => console.log(Error));
  }
}

User.init(
  {
    name: {
      type: S.STRING,
      aloowNull: false,
    },
    lastName: {
      type: S.STRING,
      allowNull: false,
    },
    email: {
      type: S.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    salt: {
      type: S.STRING,
    },
  },

  { sequelize: db, modelName: "user" }
);

User.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync();
  user.salt = salt;
  return user.hash(user.password, salt).then((passHash) => {
    user.password = passHash;
  });
});

module.exports = User;

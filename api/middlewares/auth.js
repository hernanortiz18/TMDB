const { validateToken } = require("../config/tokens");

function validateUser(req, res, next) {
  if (!req.cookies.token) return res.sendStatus(401);
  const { user } = validateToken(req.cookies.token);
  if (!user) return res.sendStatus(401);

  req.user = user;

  next();
}

module.exports = validateUser;

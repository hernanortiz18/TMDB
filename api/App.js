const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes");
const port = 8080;
require("./models");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: `http://localhost:5173`, credentials: true }));

app.use("/api", router);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

db.sync({ force: false }).then(
  app.listen(port, () => {
    console.log(`Server listen in port ${port}`);
  })
);

module.exports = app;

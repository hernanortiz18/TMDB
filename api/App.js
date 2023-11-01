const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const router = require("./routes");
const port = 8080;

const app = express();

app.use(express.json());
app.use(cors(`http://localhost:5173`));

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

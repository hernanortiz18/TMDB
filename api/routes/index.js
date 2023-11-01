const express = require("express");
const userRouter = require("./userRouter");
const router = express.Router();

router.use("/users", userRouter);

router.use("/", (req, res) => {
  res.sendStatus(200);
});

module.exports = router;

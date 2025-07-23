const express = require("express");

const router = express.Router();

const authRouter = require("./auth.route");

const testRouter = require("./test.route");
const fileRouter = require("./file.route");
const emailRouter = require("./email.route");

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/auth", authRouter);

router.use("/test", testRouter);
router.use("/file", fileRouter);
router.use("/email", emailRouter);

module.exports = router;

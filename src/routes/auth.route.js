const express = require("express");

const router = express.Router();

const auth = require("../controllers/auth.controller");
const verifyAuth = require("../middlewares/verifyAuth");

router.post(
  "/register",
  [verifyAuth.registerValidation, verifyAuth.checkDuplicateEmail],
  auth.register
);

router.post("/login", [verifyAuth.registerValidation], auth.login);

router.post(
  "/refreshToken",
  [verifyAuth.verifyRefreshToken],
  auth.refreshToken
);

router.get("/me", [verifyAuth.verifyToken, verifyAuth.isClient], auth.me);

module.exports = router;

// https://codeforgeek.com/refresh-token-jwt-nodejs-authentication/

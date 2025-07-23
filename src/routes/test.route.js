const express = require("express");

const router = express.Router();

const test = require("../controllers/test.controller");

router.get("/find", test.find);

module.exports = router;

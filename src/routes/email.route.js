const express = require("express");

const router = express.Router();

const email = require("../controllers/email.controller");

router.post("/send", email.send);

module.exports = router;

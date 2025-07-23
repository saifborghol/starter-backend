const express = require("express");

const router = express.Router();

const file = require("../controllers/file.controller");

router.get("/find", file.find);
router.post("/upload", file.upload);

module.exports = router;

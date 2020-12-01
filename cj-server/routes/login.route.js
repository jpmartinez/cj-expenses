const express = require("express");
const formidable = require("formidable");
const router = express.Router();
const { login } = require("../services/login.service");

router.post("/", login);

module.exports = router;

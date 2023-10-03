const express = require("express");
const router = express.Router();
const needle = require("needle");
const createTransfer = require("../controller/create.transfer");
const showTransfer = require("../controller/create.transfer");

//Make a single transfer
router.post("/", createTransfer);

//Check details of a single transfer
router.get("/:id", showTransfer);

module.exports = router;

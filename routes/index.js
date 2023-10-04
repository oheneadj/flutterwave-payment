const express = require("express");
const router = express.Router();
const createTransfer = require("../controller/create.transfer");
const showTransfer = require("../controller/show.transfer");
const bulkTransfer = require("../controller/bulk.transfer");

//Make a single transfer
router.post("/", createTransfer);

//Make a bulk transfer
router.post("/bulk", bulkTransfer);

//Check details of a single transfer
router.get("/:id", showTransfer);

module.exports = router;

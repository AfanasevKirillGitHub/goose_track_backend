const express = require("express");
const router = express.Router();

const { ctrlWrapper } = require("../../middlewares");
const { services: ctrl } = require("../../controllers");

router.post("/", ctrlWrapper(ctrl.getAllServices));

module.exports = router;

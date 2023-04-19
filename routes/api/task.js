const express = require("express");
const router = express.Router();

const { ctrlWrapper } = require("../../middlewares");
const { tasks: ctrl } = require("../../controllers");

router.get("/", ctrlWrapper(ctrl.getAllTasks));

module.exports = router;

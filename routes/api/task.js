const express = require("express");
const router = express.Router();

const { auth, ctrlWrapper, translate } = require("../../middlewares");
const { tasks: ctrl } = require("../../controllers");

router.get("/", auth, ctrlWrapper(ctrl.getAllTasks));
router.post("/", auth, translate, ctrlWrapper(ctrl.addTask));

module.exports = router;

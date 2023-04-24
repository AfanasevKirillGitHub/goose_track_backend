const express = require("express");
const router = express.Router();

const { auth, ctrlWrapper, translate } = require("../../middlewares");
const { tasks: ctrl } = require("../../controllers");

router.get("/", auth, ctrlWrapper(ctrl.getAllTasks));
router.post("/", auth, ctrlWrapper(ctrl.addTask));
router.patch("/:id", auth, translate, ctrlWrapper(ctrl.updateTasks));
router.delete("/:id", auth, ctrlWrapper(ctrl.deleteTasks));

module.exports = router;

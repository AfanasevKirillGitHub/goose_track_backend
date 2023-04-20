const express = require("express");
const router = express.Router();

const { schemas } = require("../../models/user");
const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

router.patch("/info", auth, ctrlWrapper(ctrl.update));

router.post("/jwtrefresh", auth, ctrlWrapper(ctrl.refreshToken));

router.get("/current", auth, ctrlWrapper(ctrl.getUserInfo));

module.exports = router;

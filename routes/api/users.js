const express = require("express");
const router = express.Router();

const { schemas } = require("../../models/user");
const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

router.post(
  "/register",
  validation(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

router.patch("/update", auth, ctrlWrapper(ctrl.update));

router.post("/jwtrefresh", auth, ctrlWrapper(ctrl.refreshTocken));

module.exports = router;

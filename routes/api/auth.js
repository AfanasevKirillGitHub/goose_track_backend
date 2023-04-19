const express = require("express");
const router = express.Router();

const { schemas } = require("../../models/user");
const {
  auth,
  validation,
  ctrlWrapper,
  passport,
} = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

router.post(
  "/register",
  validation(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  ctrlWrapper(ctrl.googleAuth)
);

router.post("/login", validation(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.post(
  "/login/with-token",
  validation(schemas.loginWhithTokenSchema),
  ctrlWrapper(ctrl.loginWithToken)
);

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;

const express = require("express");
const router = express.Router();

const { schemas } = require("../../models/user");
const { auth, ctrlWrapper, upload, validation } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

router.patch(
  "/info",
  auth,
  upload.single("avatar"),
  validation(schemas.updateInfoSchema),
  ctrlWrapper(ctrl.updateUserInfo)
);

router.post("/jwtrefresh", auth, ctrlWrapper(ctrl.refreshToken));

router.get("/current", auth, ctrlWrapper(ctrl.getUserInfo));

module.exports = router;

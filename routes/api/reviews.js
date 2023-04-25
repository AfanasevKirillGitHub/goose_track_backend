const express = require("express");
const router = express.Router();

const { auth, ctrlWrapper } = require("../../middlewares");
const { reviews: ctrl } = require("../../controllers");

router.get("/", ctrlWrapper(ctrl.getAllReviews));
router.post("/", auth, ctrlWrapper(ctrl.addReview));

module.exports = router;
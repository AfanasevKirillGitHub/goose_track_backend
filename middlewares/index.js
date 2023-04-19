const auth = require("./auth");
const validation = require("./validation");
const ctrlWrapper = require("./ctrlWrapper");

const isValidId = require("./isValidId");
const upload = require("./upload");
const translate = require("./translate");
const passport = require("./passport");

module.exports = {
  passport,
  auth,
  validation,
  ctrlWrapper,
  isValidId,
  upload,
  translate,
};

const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const update = require("./update");
const refreshToken = require("./refreshToken");
const getUserInfo = require("./getUserInfo");
const googleAuth = require("./googleAuth");
const loginWithToken = require("./loginWithToken");

module.exports = {
  googleAuth,
  register,
  login,
  logout,
  update,
  refreshToken,
  getUserInfo,
  loginWithToken,
};

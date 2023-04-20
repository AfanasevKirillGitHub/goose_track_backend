const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const updateUserInfo = require("./updateUserInfo");
const refreshToken = require("./refreshToken");
const getUserInfo = require("./getUserInfo");
const googleAuth = require("./googleAuth");
const loginWithToken = require("./loginWithToken");

module.exports = {
  googleAuth,
  register,
  login,
  logout,
  updateUserInfo,
  refreshToken,
  getUserInfo,
  loginWithToken,
};

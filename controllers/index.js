const users = require("./users");
const tasks = require("./tasks");

const loginWithToken = require("./users/loginWithToken");

module.exports = {
  users,
  tasks,
  loginWithToken,
};

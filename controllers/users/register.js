const { User } = require("../../models/user");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, password, city, phone } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    city,
    phone,
    avatarURL: null 
  });

  res.status(201).json({
    message: "Registration completed successfully",
    newUser: {
        name: newUser.name,
        email: newUser.email,
    },
  });
};

module.exports = register;
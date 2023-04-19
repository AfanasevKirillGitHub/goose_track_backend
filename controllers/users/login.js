const { User } = require("../../models/user");
const { Unauthorized } = require("http-errors");
const { SECRET_KEY } = process.env;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  const passwordCompare = bcrypt.compareSync(password, user.password);
  if (!user || !passwordCompare) {
    throw Unauthorized("Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    message: "Login completed successfully",
    dataUser: {
      email: user.email,
      token,
    },
  });
};

module.exports = login;
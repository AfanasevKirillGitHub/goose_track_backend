const { User } = require("../../models/user");
const { Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const { createToken } = require("../../helpers");

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

  const token = createToken(payload);
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    message: "Login completed successfully",
    dataUser: {
      name: user.name,
      email: user.email,
      birthday: user.birthday,
      phone: user.phone,
      avatarURL: user.avatarURL,
      token,
    },
  });
};

module.exports = login;

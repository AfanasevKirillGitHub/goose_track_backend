const { User } = require("../../models/user");
const { Conflict } = require("http-errors");
const { createToken } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const newUser = new User({ name, email, avatarURL: null, phone: null, skype: null, birthday: null, });
  await newUser.setPassword(password);

  const payload = {
    id: newUser._id,
  };
  const token = createToken(payload);
  newUser.token = token;

  await newUser.save();

  res.status(201).json({
    message: "Registration completed successfully",
    dataUser: {
      name: newUser.name,
      email: newUser.email,
      birthday: newUser.birthday,
      phone: newUser.phone,
      skype: newUser.skype,
      avatarURL: newUser.avatarURL,
      token: newUser.token,
    },
  });
};

module.exports = register;

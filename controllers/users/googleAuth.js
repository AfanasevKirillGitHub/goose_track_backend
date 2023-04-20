const { User } = require("../../models/user");
const { createToken } = require("../../helpers");

const googleAuth = async (req, res) => {
  const { _id: id } = req.user;

  const payload = {
    id,
  };

  const token = createToken(payload);
  await User.findByIdAndUpdate(id, { token });

  res.redirect(`https://goose-track-inteam.netlify.app?token=${token}`);
};

module.exports = googleAuth;

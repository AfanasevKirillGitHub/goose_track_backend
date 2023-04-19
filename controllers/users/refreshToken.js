const { User } = require("../../models/user");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const refreshToken = async (req, res) => {
  const { _id } = req.user;

  const payload = {
    id: _id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(_id, { token });

  res.status(200).json({
    message: "Token refresh completed successfully",
    token,
  });
};

module.exports = refreshToken;

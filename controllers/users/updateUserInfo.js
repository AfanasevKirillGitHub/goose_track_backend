const { User } = require("../../models/user");

const updateUserInfo = async (req, res) => {
  const { _id } = req.user;
  const { body } = req;

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { $set: body },
    { new: true, runValidators: true }
  );

  if (updatedUser) {
    return res.status(200).json({
      message: "Update completed successfully",
      user: {
        ...body,
      },
    });
  }
};

module.exports = updateUserInfo;

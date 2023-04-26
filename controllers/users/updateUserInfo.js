const { User } = require("../../models/user");
const { BadRequest, NotFound } = require("http-errors");
const { cloudinaryImgUpload } = require("../../helpers");

const updateUserInfo = async (req, res) => {
  const { body, file, user } = req;

  if (Object.keys(body).length === 0 && !file) {
    throw new BadRequest("No updating data!");
  }

  if (file) {
    const { avatarURL } = await cloudinaryImgUpload(req);
    body.avatarURL = avatarURL;
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      $set: body,
    },
    { new: true, runValidators: true }
  );

  if (updatedUser) {
    const { name, email, birthday, phone, skype, avatarURL, token } =
      updatedUser;

    return res.status(200).json({
      message: "Updated successfully",
      dataUser: {
        name,
        email,
        birthday,
        phone,
        skype,
        avatarURL,
        token,
      },
    });
  }

  throw new NotFound("Not found");
};

module.exports = updateUserInfo;

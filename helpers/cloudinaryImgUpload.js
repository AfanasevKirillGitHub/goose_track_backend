const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs/promises");

// додати в файл - .env
// const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;
const CLOUD_NAME = "dnjyfeq2k";
const API_KEY = 688796134262243;
const API_SECRET = "roD_55lDzcLHfkRHs3fR0euhgWQ";
//==========================================================

dotenv.config();

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

const cloudinaryImgUpload = async (req) => {
  if (req.file) {
    const { path: tempUpload } = req.file;

    try {
      const { secure_url: avatarURL, public_id: idCloudAvatar } =
        await cloudinary.uploader.upload(tempUpload, {
          folder: "images",
          transformation: {
            width: 288,
            height: 288,
            gravity: "auto",
            crop: "fill",
          },
        });

      await fs.unlink(tempUpload);

      return { avatarURL, idCloudAvatar };
    } catch (error) {
      await fs.unlink(tempUpload);
      throw new Error(error.message);
    }
  }
};

module.exports = cloudinaryImgUpload;

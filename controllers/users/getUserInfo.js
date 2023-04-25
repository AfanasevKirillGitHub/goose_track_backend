const getUserInfo = async (req, res) => {
  const { name, email, birthday, phone, skype, avatarURL, token } = req.user;

  res.status(200).json({
    message: "success",
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
};

module.exports = getUserInfo;

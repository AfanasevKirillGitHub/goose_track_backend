const getUserInfo = async (req, res) => {
  const { avatarURL, name, email, birthday, phone, skype } = req.user;

  res.status(200).json({
    statuss: "success",
    dataUser: {
      avatarURL,
      name,
      email,
      birthday,
      phone,
      skype,
    },
  });
};

module.exports = getUserInfo;

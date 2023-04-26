const { Review } = require("../../models/review");

const getAllRewiews = async (req, res) => {
  const rewiew = await Review.find();

  res.status(200).json({
    message: "Successfully",
    rewiew,
    total: rewiew.length,
  });
};

module.exports = getAllRewiews;

const { Review } = require("../../models/review");


const addReview = async (req, res) => {
    const { name, avatarURL='' } = req.user;
    const { body } = req;
  
    const review = await Review.create({ ...body, name, imgUrl:avatarURL });
  
    res.status(201).json({
      message: "Successfully",
      ReviewData: review,
    });
  };
  
  module.exports = addReview;

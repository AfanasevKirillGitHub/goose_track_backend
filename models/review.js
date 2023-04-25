const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { validationError } = require("../helpers");

const reviewsSchema = new Schema(
    {
      stars: {
        type: Number,
        required: true,
        description: "Stars",
        default: 5,
        min: 1,
        max: 5,
      },
      
      reviewText: {
        type: String,
        required: true,
        description: "Review",
      },
      name: {
        type: String,
        required: true,
        description: "Name",      
      },
      imgUrl: {
        type: String,
        required: true,
        default: "",
        description: "Name",      
      },

    },
    { versionKey: false, timestamps: true }
  );
  const Review = model("review", reviewsSchema);

  const addReviewSchema = Joi.object({
    stars: Joi.number().required(),
    reviewText: Joi.string().required(),
    name: Joi.string().required(),
    imgUrl: Joi.string()
  });
  
  const schemas = {
    addReviewSchema,
  };
  
  reviewsSchema.post("save", validationError);
  
  module.exports = { Review, schemas };
  
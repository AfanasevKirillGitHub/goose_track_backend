const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const { validationError } = require("../helpers");

const FILE_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    skype: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    birthday: {
      type: Date,
      min: "1977-09-28",
      max: "2015-05-23",
      default: null,
    },
    avatarURL: {
      type: String,
      default: "",
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = async function (password) {
  this.password = await bcrypt.hash(password, 10);
};

userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.post("save", validationError);
userSchema.post("findOneAndUpdate", validationError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const loginWithTokenSchema = Joi.object({
  token: Joi.string().required(),
});

const updateInfoSchema = Joi.object({
  name: Joi.string().min(2).max(16),
  birthday: Joi.date(),
  email: Joi.string(),
  phone: Joi.string(),
  skype: Joi.string(),
  avatarURL: Joi.any(),
  // avatarURL: Joi.object({
  //   type: Joi.string().valid(...FILE_TYPES),
  // }).unknown(),
});

const User = model("user", userSchema);

const schemas = {
  registerSchema,
  loginSchema,
  loginWithTokenSchema,
  updateInfoSchema,
};

module.exports = { schemas, User };

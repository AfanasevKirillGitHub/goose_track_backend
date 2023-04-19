const { Schema, model } = require("mongoose");
const { validationError } = require("../helpers");

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    type: {
      type: Date,
      required: [true, "Type is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

serviceSchema.post("save", validationError);

const Service = model("service", serviceSchema);

module.exports = { Service };

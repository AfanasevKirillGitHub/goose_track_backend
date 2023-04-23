const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { validationError } = require("../helpers");

const STATUS = ["todo", "inprogress", "done"];
const PRIORITY = ["low", "medium", "high"];

const tasksSchema = new Schema(
  {
    title: {
      en: {
        type: String,
        required: true,
        unique: true,
        description: "Tasks title in English",
      },
      ua: {
        type: String,
        required: true,
        unique: true,
        description: "Tasks title in Ukrainian",
      },
    },

    start: {
      type: String,
      required: true,
      description: "Tasks start",
    },
    end: {
      type: String,
      required: true,
      description: "Tasks start",
    },

    date: {
      type: String,
      required: true,
      description: "Tasks date",
    },
    status: {
      type: String,
      enum: STATUS,
      required: true,
    },
    priority: {
      type: String,
      enum: PRIORITY,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Task = model("task", tasksSchema);

const addTaskSchema = Joi.object({
  title: Joi.string().required(),
  start: Joi.string().required(),
  end: Joi.string().required(),
  date: Joi.string().required(),
  status: Joi.string()
    .valid(...STATUS)
    .required(),
  priority: Joi.string()
    .valid(...PRIORITY)
    .required(),
});

const schemas = {
  addTaskSchema,
};

tasksSchema.post("save", validationError);

module.exports = { Task, schemas };

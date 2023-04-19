const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { validationError } = require("../helpers");

const PRIORITY = ["todo", "inprogress", "done"];
const STATUS = ["low", "medium", "high"];

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
        description: "Tasks title in Ukr",
      },
    },

    statr: {
      type: String,
      required: true,
      description: "Tasks statr",
    },
    end: {
      type: String,
      required: true,
      description: "Tasks statr",
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
    },
  },
  { versionKey: false, timestamps: true }
);

const Task = model("task", tasksSchema);

const addTaskSchema = Joi.object({
  title: Joi.string().required(),
  statr: Joi.string().required(),
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
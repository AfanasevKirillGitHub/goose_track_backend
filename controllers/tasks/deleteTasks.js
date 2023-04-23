const { Task } = require("../../models");
const { NotFound } = require("http-errors");

const deleteTasks = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const taskToDelete = await Task.findOneAndDelete({
    date: id,
    owner: _id,
  });

  if (!taskToDelete) {
    throw NotFound("Task not found");
  }

  res.status(200).json({
    message: "Successfully",
    taskDeleted: taskToDelete,
  });
};

module.exports = deleteTasks;

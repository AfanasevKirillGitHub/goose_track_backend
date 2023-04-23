const { Task } = require("../../models");
const { NotFound } = require("http-errors");

const updateTasks = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const { body } = req;
  const task = await Task.findOneAndUpdate(
    { date: id, owner: _id },
    body.data,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!task) {
    throw NotFound("Task not found");
  }

  res.status(200).json({
    message: "Successfully",
    taskData: task,
  });
};

module.exports = updateTasks;

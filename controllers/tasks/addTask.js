const { Task } = require("../../models/task");

const addTask = async (req, res) => {
  const { _id } = req.user;

  console.log("req.body :>> ", req.body);
  const task = await Task.create({ ...req.body.data, owner: _id });

  res.status(200).json({
    message: "Successfully",
    taskData: task,
  });
};

module.exports = addTask;

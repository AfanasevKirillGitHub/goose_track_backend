const { Task } = require("../../models/task");

const addTask = async (req, res) => {
  const { _id } = req.user;
  const { data: taskData } = req.body;

  const task = await Task.create({ ...taskData, owner: _id });

  console.log("task :>> ", task);

  res.status(201).json({
    message: "Successfully",
    taskData: task,
  });
};

module.exports = addTask;

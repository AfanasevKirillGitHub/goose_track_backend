const { Task } = require("../../models/task");


const getAllTasks = async (req, res) => {
  const { _id } = req.user;

  const newsFilter = {
    owner: _id,
  };

  const tasks = await Task.find(newsFilter, {
    title: 1,
    start: 1,
    end: 1,
    date: 1,
    status: 1,
    priority: 1,
    _id: 1,
  }).populate("owner", "_id name email");

  // const newsFilter = {
  //   [`title.${lang}`]: { $exists: true },
  //   owner: _id,
  // };

  // const tasks = await Task.find(newsFilter, {
  //   [`title.${lang}`]: 1,
  //   start: 1,
  //   end: 1,
  //   date: 1,
  //   status: 1,
  //   priority: 1,
  //   _id: 1,
  // }).populate("owner", "_id name email");

  res.status(200).json({
    message: "Successfully",
    tasks,
    total: tasks.length,
  });
};

module.exports = getAllTasks;

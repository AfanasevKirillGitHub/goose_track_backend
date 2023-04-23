const { Task } = require("../../models/task");
const { BadRequest } = require("http-errors");

const getAllTasks = async (req, res) => {
  const { _id } = req.user;
  const { lang = "ua" } = req.query;

  const allowedLanguages = ["ua", "en"];

  if (!allowedLanguages.includes(lang)) {
    throw BadRequest(
      "Choose another type of language. Available options: ua, en."
    );
  }

  const newsFilter = {
    [`title.${lang}`]: { $exists: true },
    owner: _id,
  };

  const tasks = await Task.find(newsFilter, {
    [`title.${lang}`]: 1,
    start: 1,
    end: 1,
    date: 1,
    status: 1,
    priority: 1,
    _id: 1,
  }).populate("owner", "_id name email");

  res.json({
    message: "Successfully",
    tasks,
    total: tasks.length,
  });
};

module.exports = getAllTasks;

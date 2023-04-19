const { Task } = require("../../models/task");
const { BadRequest } = require("http-errors");

const getAllNews = async (req, res) => {
  const { lang = "ua", key = "", page = 1, limit = 12 } = req.query;

  const allowedLanguages = ["ua", "en"];

  if (!allowedLanguages.includes(lang)) {
    throw BadRequest(
      "Choose another type of language. Availablel options: ua, en."
    );
  }

  const newsFilter = {
    [`title.${lang}`]: { $exists: true },
  };

  if (key) {
    newsFilter.$or = [
      { [`title.${lang}`]: { $regex: key, $options: "i" } },
      { [`description.${lang}`]: { $regex: key, $options: "i" } },
    ];
  }
  const skip = (page - 1) * limit;

  const tasks = await Task.find(
    newsFilter,
    {
      [`title.${lang}`]: 1,
      [`description.${lang}`]: 1,
      link: 1,
      img: 1,
      date: 1,
      _id: 1,
    },
    { skip, limit: +limit }
  );

  res.json({
    message: "Successfully",
    tasks,
    total: tasks.length,
  });
};

module.exports = getAllNews;

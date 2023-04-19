const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const usersRouter = require("./routes/api/users");
const servicesRouter = require("./routes/api/services");
// const newsRouter = require("./routes/api/news");
// const noticesRouter = require("./routes/api/notices");
// const petsRouter = require("./routes/api/pets");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", usersRouter);
app.use("/api/services", servicesRouter);
// app.use("/api/news", newsRouter);
// app.use("/api/notices", noticesRouter);
// app.use("/api/pets", petsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;

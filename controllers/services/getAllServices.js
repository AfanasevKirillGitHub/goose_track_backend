const { Service } = require("../../models/service");

const getAllServices = async (_, res) => {
  const services = await Service.find({}, "-createdAt -updatedAt");
  res.json({
    message: "Successfully",
    services,
  });
};

module.exports = getAllServices;

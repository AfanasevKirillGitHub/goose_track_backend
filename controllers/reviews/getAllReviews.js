const { Rewiew } = require("../../models/review");

const getAllRewiews = async (req, res) => {
  
    const rewiew = await Rewiew.find( )
  
         res.status(200).json({
      message: "Successfully",
      rewiew,
      total: rewiew.length,
    });
  };
  
  module.exports = getAllRewiews;
  
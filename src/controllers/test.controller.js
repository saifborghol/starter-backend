const mathOperations = require("../helpers/calculator");

const find = async (req, res) => {
  const sum = mathOperations.sum(1, 1);
  res.json({ data: [], message: sum });
};

module.exports = {
  find,
};

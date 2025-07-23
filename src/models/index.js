const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.User = require("./user.model");
db.Role = require("./role.model");

db.ROLES_LIST = [
  { name: "admin" },
  { name: "employee" },
];

module.exports = db;

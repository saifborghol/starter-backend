const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The name field is required !"],
    },
  },
  { timestamps: true }
);

const Role = mongoose.model("Role", RoleSchema);

module.exports = Role;

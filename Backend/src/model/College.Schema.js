const mongoose = require("mongoose");

const CollegeSchema = new mongoose.Schema(
  {
    college: {
      type: String,
      unique: true,
      required: true,
    },
    abreviation: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("college", CollegeSchema);

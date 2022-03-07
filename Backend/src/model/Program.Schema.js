const mongoose = require("mongoose");

const ProgramSchema = new mongoose.Schema(
  {
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "college",
      default: null,
    },
    prog_code: {
      type: String,
      unique: true,
      required: true,
    },
    program: {
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

module.exports = mongoose.model("program", ProgramSchema);

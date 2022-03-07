const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    student_num: {
      type: String,
      unique: true,
      required: true,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    middlename: {
      type: String,
    },
    sex: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("student", StudentSchema);

const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const enrollementSchema = new mongoose.Schema(
  {
    id: Number,
    student_num: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },
  },
  { timestamps: true }
);
enrollementSchema.plugin(autoIncrement, { inc_field: "id" });

module.exports = mongoose.model("enroll", enrollementSchema);

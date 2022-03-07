const mongoose = require("mongoose");
const Enrollment = require("./enroll");
const CourseSchema = new mongoose.Schema(
  {
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "program",
      required: true,
    },
    course_code: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);
CourseSchema.pre("remove", async function (next) {
  const doc = this;
  console.log(doc._id);
  await Enrollment.remove({ course: this._id }).exec();

  next();
});
module.exports = mongoose.model("course", CourseSchema);

const Course = require("./../model/course.Schema");
const Enrollment = require("./../model/enroll");
exports.create = async (req, res) => {
  try {
    const { program, course_code, course, description } = req.body;
    const courseCodeExist = await Course.findOne({
      course_code: course_code.toUpperCase(),
    }).lean();
    if (courseCodeExist) {
      return res.status(400).json({ msg: "Course Code Already Existed" });
    }
    const courseExist = await Course.findOne({
      course: course.toUpperCase(),
    }).lean();
    if (courseExist) {
      return res.status(400).json({ msg: "Course  Already Existed" });
    }
    const saving = await new Course({
      program,
      course_code: course_code.toUpperCase(),
      course: course.toUpperCase(),
      description,
    }).save();
    if (saving) {
      return res
        .status(200)
        .json({ msg: "Successfully Created", course: saving });
    }
    return res.status(400).json({ msg: "Failed to Create Course" });
  } catch (e) {
    return res.status(400).json({ msg: "Failed to Create Course" });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { course_code, course, description, _id } = req.body;

    const courseCodeExist = await Course.findOne({
      course_code: course_code.toUpperCase(),
      _id: { $ne: _id },
    }).lean();
    if (courseCodeExist) {
      return res.status(400).json({ msg: "Course Code Already Existed" });
    }
    const courseExist = await Course.findOne({
      course: course.toUpperCase(),
      _id: { $ne: _id },
    }).lean();
    if (courseExist) {
      return res.status(400).json({ msg: "Course  Already Existed" });
    }
    const updating = await Course.findOneAndUpdate(
      { _id },
      {
        $set: {
          course_code: course_code.toUpperCase(),
          course: course.toUpperCase(),
          description,
        },
      },
      { upsert: true }
    );
    if (updating) {
      const coursex = await Course.findOne({ _id }).lean();
      return res
        .status(200)
        .json({ msg: "Updated Successfully", course: coursex });
    }
  } catch (e) {
    return res.status(400).json({ msg: "Failed to Updated Course" });
  }
};
exports.deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const deleting = await Course.remove({ _id: id });
    if (deleting) {
      await Enrollment.remove({ course: id }).exec();
      return res.status(200).json({ msg: "Successfully Deleted" });
    }
    return res.status(400).json({ msg: "Failed to Delete Course" });
  } catch (e) {
    return res.status(400).json({ msg: "Failed to Delete Course" });
  }
};

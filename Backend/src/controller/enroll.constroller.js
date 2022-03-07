const Enroll = require("./../model/enroll");
const Course = require("./../model/course.Schema");
const Student = require("./../model/Student");
exports.create = async (req, res) => {
  try {
    const { student, courses } = req.body;

    const isStudentExist = await Student.findOne({ _id: student }).lean();
    if (!isStudentExist) {
      return res.status(400).json({ msg: "Student Does not Exist or Deleted" });
    }
    let savedData = [];
    for (let course of courses) {
      const isCourseExist = await Course.findOne({ _id: course.value }).lean();
      if (isCourseExist) {
        const saving = await new Enroll({
          student_num: student,
          course: course.value,
        }).save();
        if (saving) {
          const studentInfo = await Enroll.findOne({ _id: saving._id })
            .populate({
              path: "course",
              populate: {
                path: "program",
                populate: {
                  path: "college",
                },
              },
            })
            .populate("student_num")
            .lean();
          savedData.push(studentInfo);
        }
      }
    }

    return res.status(200).json({ msg: "Successfully Save", savedData });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ msg: "Failed to Create Data" });
  }
};

exports.update = async (req, res) => {
  try {
    const { student, course, _id } = req.body;
    const isCourseExist = await Course.findOne({ _id: course }).lean();
    if (!isCourseExist) {
      return res.status(400).json({ msg: "Course Does not Exist or Deleted" });
    }
    const isStudentExist = await Student.findOne({ _id: student }).lean();
    if (!isStudentExist) {
      return res.status(400).json({ msg: "Student Does not Exist or Deleted" });
    }
    const updating = await Enroll.findOneAndUpdate(
      { _id },
      {
        $set: {
          student_num: student,
          course,
        },
      },
      { upsert: true }
    );
    if (updating) {
      const studentInfo = await Enroll.findOne({ _id })
        .populate({
          path: "course",
          populate: {
            path: "program",
            populate: {
              path: "college",
            },
          },
        })
        .populate("student_num")
        .lean();
      return res
        .status(200)
        .json({ msg: "Successfully Updated", student: studentInfo });
    }
    return res.status(400).json({ msg: "Failed to Update" });
  } catch (e) {
    return res.status(400).json({ msg: "failed to Updated" });
  }
};

exports.getStudentInfo = async (req, res) => {
  try {
    const students = await Enroll.find()
      .populate({
        path: "course",
        populate: {
          path: "program",
          populate: {
            path: "college",
          },
        },
      })
      .populate("student_num")
      .lean();
    return res
      .status(200)
      .json({ msg: "Students Enrollment Information", students });
  } catch (e) {
    return res.status(400).json({ msg: "failed to get Data" });
  }
};

exports.deleteEnrolled = async (req, res) => {
  try {
    const id = req.params.id;
    const deleting = await Enroll.remove({ _id: id });
    if (deleting) {
      return res.status(200).json({ msg: "Deleting Successfully", id });
    }
    return res.status(400).json({ msg: "failed to Delete Data" });
  } catch (e) {
    return res.status(400).json({ msg: "failed to Delete Data" });
  }
};

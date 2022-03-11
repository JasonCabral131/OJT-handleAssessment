const Student = require("./../model/Student");
const Enroll = require("./../model/enroll");
exports.create = async (req, res) => {
  try {
    const { firstname, lastname, middlename, sex, birthday, phone, email } =
      req.body;
    const isEmailExist = await Student.findOne({ email }).lean();
    if (isEmailExist) {
      return res.status(400).json({ msg: "Email Already Been Taken" });
    }
    const nameAlreadyTaken = await Student.findOne({
      firstname: firstname.toLowerCase(),
      lastname: lastname.toLowerCase(),
    }).lean();
    if (nameAlreadyTaken) {
      return res.status(400).json({ msg: "Name Already Been Taken" });
    }
    const yr = new Date().getFullYear().toString().substr(-2);
    Number.prototype.padLeft = function (n, str) {
      return Array(n - String(this).length + 1).join(str || "0") + this;
    };
    const numberOFStudent = await Student.find().lean();
    const stud = (numberOFStudent.length + 1).padLeft(5);
    const student_num = yr + stud.toString();
    const saving = await new Student({
      student_num,
      firstname: firstname.toLowerCase(),
      lastname: lastname.toLowerCase(),
      middlename,
      sex,
      birthday,
      phone,
      email,
    }).save();
    if (saving) {
      const enrolled = await Enroll.find({ student_num: saving._id }).lean();

      return res
        .status(200)
        .json({ msg: "Successfully Save", student: { ...saving, enrolled } });
    }
    return res.status(400).json({ msg: "Failed to Created Student" });
  } catch (e) {
    return res.status(400).json({ msg: "Failed to Created Student" });
  }
};
exports.update = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      middlename,
      sex,
      birthday,
      phone,
      email,
      _id,
    } = req.body;
    const isEmailExist = await Student.findOne({
      email,
      _id: { $ne: _id },
    }).lean();
    if (isEmailExist) {
      return res.status(400).json({ msg: "Email Already Been Taken" });
    }
    const nameAlreadyTaken = await Student.findOne({
      firstname: firstname.toLowerCase(),
      lastname: lastname.toLowerCase(),
      _id: { $ne: _id },
    }).lean();
    if (nameAlreadyTaken) {
      return res.status(400).json({ msg: "Name Already Been Taken" });
    }
    const updating = await Student.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          firstname: firstname.toLowerCase(),
          lastname: lastname.toLowerCase(),
          middlename,
          sex,
          birthday,
          phone,
          email,
        },
      },
      { upsert: true }
    );
    if (updating) {
      const student = await Student.findOne({ _id }).lean();
      const enrolled = await Enroll.find({ student_num: _id }).lean();
      return res
        .status(200)
        .json({
          msg: "Successfully Updated",
          student: { ...student, enrolled },
        });
    }
    return res.status(400).json({ msg: "Failed to Created Student" });
  } catch (e) {
    return res.status(400).json({ msg: "Failed to updated User" });
  }
};
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().lean();

    let studentList = [];
    for (let stud of students) {
      const enroll = await Enroll.find({ student_num: stud._id })
        .populate({
          path: "course",
          populate: {
            path: "program",
            populate: {
              path: "college",
            },
          },
        })
        .lean();
      studentList.push({ ...stud, enrolled: enroll });
    }
    return res.status(200).json(studentList);
  } catch (e) {
    return res.status(400).json({ msg: "Failed to Get Data" });
  }
};
exports.getStudent = async (req, res) => {
  try {
    const id = req.params.id;

    const student = await Student.findOne({ _id: id }).lean();
    return res.status(200).json(student);
  } catch (e) {
    return res.status(400).json({ msg: "Failed to Get Data" });
  }
};
exports.deleteStudent = async (req, res) => {
  try {
    const _id = req.params.id;
    const deleting = await Student.deleteOne({ _id });
    if (deleting) {
    } else {
      return res.status(400).json({ msg: "Failed to Delete Student" });
    }
  } catch (e) {
    return res.status(400).json({ msg: "Failed to Delete Student" });
  }
};

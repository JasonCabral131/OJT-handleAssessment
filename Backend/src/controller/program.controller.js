const Program = require("./../model/Program.Schema");
const Course = require("./../model/course.Schema");
exports.create = async (req, res) => {
  try {
    const { college_id, prog_code, program, description } = req.body;

    const isExistProgCode = await Program.findOne({
      prog_code: prog_code.toUpperCase(),
    }).lean();

    if (isExistProgCode) {
      return res.status(400).json({ msg: "Abreviation Already Existed" });
    }
    const isExistedPrograms = await Program.findOne({
      program: program.toUpperCase(),
    }).lean();
    if (isExistedPrograms) {
      return res.status(400).json({ msg: "Program Already Existed" });
    }
    const saving = await Program({
      prog_code: prog_code.toUpperCase(),
      program: program.toUpperCase(),
      description,
      college: college_id,
    }).save();
    if (saving) {
      const programx = await Program.findOne({ _id: saving._id })
        .populate("college")
        .lean();
      const coursex = await Course.find({ program: saving._id }).lean();
      return res.status(200).json({
        msg: "Successfully Created",
        program: { ...programx, courses: coursex },
      });
    }
    return res.status(400).json({ msg: "Failed to Create Programs" });
  } catch (e) {
    return res.status(400).json({ msg: "Failed to Create Programs" });
  }
};

exports.update = async (req, res) => {
  try {
    const { _id, college_id, prog_code, program, description } = req.body;
    const isExistProgCode = await Program.findOne({
      prog_code: prog_code.toUpperCase(),
      _id: { $ne: _id },
    }).lean();

    if (isExistProgCode) {
      return res.status(400).json({ msg: "Abreviation Already Existed" });
    }
    const isExistedPrograms = await Program.findOne({
      program: program.toUpperCase(),
      _id: { $ne: _id },
    }).lean();
    if (isExistedPrograms) {
      return res.status(400).json({ msg: "Program Already Existed" });
    }
    const updating = await Program.findOneAndUpdate(
      { _id },
      {
        $set: {
          prog_code: prog_code.toUpperCase(),
          program: program.toUpperCase(),
          description,
          college: college_id,
        },
      },
      { upsert: true }
    );
    if (updating) {
      const programx = await Program.findOne({ _id })
        .populate("college")
        .lean();
      const coursex = await Course.find({ program: _id }).lean();
      return res.status(200).json({
        msg: "Successfully Updated",
        program: { ...programx, courses: coursex },
      });
    }
    return res.status(400).json({ msg: "Failed to Create Programs" });
  } catch (e) {
    return res.status(400).json({ msg: "Failed to Updated Programs" });
  }
};

exports.getPrograms = async (req, res) => {
  try {
    const programs = await Program.find().populate("college").lean();

    let programList = [];

    for (let program of programs) {
      const courses = await Course.find({ program: program._id }).lean();
      programList.push({ ...program, courses });
    }
    return res.status(200).json(programList);
  } catch (e) {
    return res.status(400).json({ msg: "Failed to " });
  }
};

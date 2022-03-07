const College = require("./../model/College.Schema");
const Program = require("./../model/Program.Schema");
const moment = require("moment");
exports.create = async (req, res) => {
  try {
    const { college, description, abreviation } = req.body;

    const isExisted = await College.findOne({ college: college.toUpperCase() });

    if (isExisted) {
      return res.status(400).json({ msg: "College Already Existed" });
    }
    const isAbreviationExist = await College.findOne({
      abreviation: abreviation.toUpperCase(),
    }).lean();
    if (isAbreviationExist) {
      return res.status(400).json({ msg: "Abreviation Already Existed" });
    }
    const saving = await new College({
      college: college.toUpperCase(),
      description,
      abreviation: abreviation.toUpperCase(),
    }).save();

    if (saving) {
      const collegex = await College.findOne({ _id: saving._id }).lean();
      const programs = await Program.find({ college: saving._id }).lean();
      return res.status(200).json({
        msg: "Successfully Created",
        college: { ...collegex, programs },
      });
    } else {
      return res
        .status(400)
        .json({ msg: "Failed to Add Telmo Solution University College" });
    }
  } catch (e) {
    return res
      .status(400)
      .json({ msg: "Failed to Add Telmo Solution University College" });
  }
};

exports.update = async (req, res) => {
  try {
    const { _id, college, description, abreviation } = req.body;
    const isExist = await College.findOne({
      college: college.toUpperCase(),
      _id: { $ne: _id },
    });
    if (isExist) {
      return res.status(400).json({ msg: "College Already Existed" });
    }
    const AbreviationExist = await College.findOne({
      abreviation: abreviation.toUpperCase(),
      _id: { $ne: _id },
    });
    if (AbreviationExist) {
      return res.status(400).json({ msg: "Abreviation Already Existed" });
    }
    const updating = await College.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          college: college.toUpperCase(),
          description,
          abreviation: abreviation.toUpperCase(),
        },
      },
      { upsert: true }
    );
    if (updating) {
      const college = await College.findOne({ _id }).lean();
      const programs = await Program.find({ college: college._id }).lean();
      return res.status(200).json({
        msg: "Successfully Updated",
        college: { ...college, programs },
      });
    } else {
      return res
        .status(400)
        .json({ msg: "Failed to Update Telmo Solution University College" });
    }
  } catch (e) {
    return res
      .status(400)
      .json({ msg: "Failed to Update Telmo Solution University College" });
  }
};
exports.getColleges = async (req, res) => {
  try {
    const colleges = await College.find().lean();
    let collegeList = [];
    for (let college of colleges) {
      const programs = await Program.find({ college: college._id }).lean();
      collegeList.push({
        ...college,
        programs,
        createdAt: moment(college.createdAt).format("YYYY MM DD,  h:mm:ss A"),
      });
    }
    return res.status(200).json({
      msg: "Colleges Data",
      colleges: collegeList,
    });
  } catch (e) {
    return res.status(400).json({ msg: "Failed to College Data" });
  }
};
exports.getCollege = async (req, res) => {
  try {
    const id = req.params.id;
    const colleges = await College.findOne({ _id: id }).lean();

    return res.status(200).json({
      msg: "Colleges Data",
      colleges: colleges.map((college) => {
        return {
          ...college,
          createdAt: moment(college.createdAt).format("YYYY MM DD,  h:mm:ss a"),
        };
      }),
    });
  } catch (e) {
    return res.status(400).json({ msg: "Failed to College Data" });
  }
};

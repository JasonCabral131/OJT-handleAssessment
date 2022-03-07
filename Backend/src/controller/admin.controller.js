const Admin = require("./../model/AdmintratorSchema");
const bcrypt = require("bcrypt");
const cloudinary = require("./../config/cloudinary");
const config = require("./../config/configuration");
const jwt = require("jsonwebtoken");
exports.createAdmin = async (req, res) => {
  try {
    const { firstname, middlename, lastname, email, password } = req.body;

    const emailExist = await Admin.findOne({
      email: email.toLowerCase(),
    }).lean();
    if (emailExist) {
      return res.status(400).json({ msg: "Email Already Been Taken" });
    }
    let adminObj = {
      firstname,
      middlename,
      lastname,
      email: email.toLowerCase(),
      password: await bcrypt.hash(password, 10),
      profile: { url: null, cloudinary_id: null },
    };
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        adminObj.profile.url = result.secure_url;
        adminObj.profile.cloudinary_id = result.public_id;
      } catch (e) {}
    }
    const saving = await new Admin(adminObj).save();
    if (saving) {
      const admin = await Admin.findOne({ _id: saving._id })
        .select("-password")
        .lean();
      return res.status(200).json({ msg: "Success fully Created", admin });
    }
    return res.status(400).json({ msg: "Failed to Create Administrative" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ msg: "Failed to Create Administrative" });
  }
};
exports.login_admin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email }).lean();
    if (admin) {
      const isPassword = await bcrypt.compare(password, admin.password);
      if (isPassword) {
        const token = jwt.sign(
          { _id: admin._id, role: "admin" },
          config.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );
        delete admin.password;
        return res.status(200).json({
          token,
          user: admin,
        });
      } else {
        return res.status(400).json({ msg: "Invalid Password" });
      }
    }
    return res.status(400).json({ msg: "Email Does not Exist" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ msg: "Invalid User" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { _id, firstname, lastname, middlename, email, cloudinary_id } =
      req.body;

    const emailExist = await Admin.findOne({
      email: email.toLowerCase(),
      _id: { $ne: _id },
    }).lean();
    if (emailExist) {
      return res.status(203).json({ msg: "Email " });
    }
    const admin = await Admin.findOne({ _id });
    if (!admin) {
      return res.status(203).json({ msg: "Failed to Update" });
    }
    admin.lastname = lastname;
    admin.firstname = firstname;
    admin.middlename = middlename;
    admin.email = email;
    if (req.body.password) {
      admin.password = await bcrypt.hash(req.body.password, 10);
    }
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const url = result.secure_url;
        const cloud_id = result.public_id;
        admin.profile.url = url;
        admin.profile.cloudinary_id = cloud_id;
      } catch (e) {}
    }
    const updating = await admin.save();
    if (updating) {
      if (req.file) {
        await cloudinary.uploader.destroy(cloudinary_id);
      }
      const admin = await Admin.findOne({ _id }).lean();
      return res.status(200).json({ msg: "Successfully Updated", admin });
    }
    return res
      .status(203)
      .json({ msg: "Failed to Updated Profile Information" });
  } catch (e) {
    console.log(e);
    return res
      .status(203)
      .json({ msg: "Failed to Updated Profile Information" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldpass, newPass, _id } = req.body;
    console.log(req.body);
    const admin = await Admin.findOne({ _id }).lean();

    if (admin) {
      const isPassword = await bcrypt.compare(oldpass, admin.password);
      if (isPassword) {
        const updating = await Admin.findOneAndUpdate(
          { _id },
          {
            $set: {
              password: await bcrypt.hash(newPass, 10),
            },
          },
          { upsert: true }
        );
        if (updating) {
          return res.status(200).json({ msg: "Successfully Updated" });
        }
      }
      return res.status(203).json({ msg: "Password Does not match" });
    }
    return res.status(203).json({ msg: "Failed to Change Password" });
  } catch (e) {
    console.log(e);
    return res.status(203).json({ msg: "Failed to Change Password" });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admin.findOne({ _id: id }).lean();
    const deleting = await Admin.remove({ _id: id });
    if (deleting) {
      if (admin) {
        await cloudinary.uploader.destroy(admin.profile.cloudinary_id);
      }
      return res.status(200).json({ msg: "Failed to Delete Admin", id });
    }
    return res.status(203).json({ msg: "Failed to Delete Admin" });
  } catch (e) {
    return res.status(203).json({ msg: "Failed to Delete Admin" });
  }
};
exports.getAdmin = async (req, res) => {
  try {
    const admins = await Admin.find({ _id: { $ne: req.admin._id } }).lean();
    return res.status(200).json(admins);
  } catch (e) {
    return res.status(400).json({ msg: "failed to get Data" });
  }
};

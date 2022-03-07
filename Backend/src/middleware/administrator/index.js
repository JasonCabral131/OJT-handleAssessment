const jwt = require("jsonwebtoken");
const config = require("./../../config/configuration");
const Admin = require("./../../model/AdmintratorSchema");
exports.requireSignin = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const user = await jwt.verify(token, config.JWT_SECRET);
      if (user) {
        const admin = await Admin.findOne({ _id: user._id });
        if (!admin) {
          return res
            .status(400)
            .json({ error: "Token Expired or Not Existed" });
        }
        if (user.role && user.role !== "admin") {
          return res.status(400).json({ message: "User Access denied" });
        }
        req.admin = user;
        next();
      } else {
        return res.status(400).json({ msg: "Token Expired" });
      }
    } else {
      return res.status(400).json({ msg: "Invalid User" });
    }
  } catch (e) {
    return res.status(400).json({ msg: "Invalid Request" });
  }
};
exports.checkAdminValidity = async (req, res) => {
  try {
    const { _id, token } = req.body;
    if (typeof _id !== "undefined" && typeof token !== "undefined") {
      const user = await jwt.verify(token, config.JWT_SECRET);
      if (user) {
        if (_id == user._id) {
          const admin = await Admin.findOne({ _id: user._id });
          if (!admin) {
            return res
              .status(400)
              .json({ error: "Token Expired or Not Existed" });
          }
          if (user.role && user.role !== "admin") {
            return res.status(400).json({ message: "User Access denied" });
          }
          delete admin.password;

          return res.status(200).json({
            token,
            user: admin,
          });
        } else {
          return res.status(203).json({ message: "Session Expired" });
        }
      }
      return res.status(203).json({ message: "Session Expired" });
    } else {
      return res.status(203).json({ message: "Session Expired" });
    }
  } catch (e) {
    return res.status(400).json({ msg: "Session Expired" });
  }
};

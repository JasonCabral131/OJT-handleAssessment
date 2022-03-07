const mongoose = require("mongoose");

const AdministratorSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    middlename: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
    },
    profile: {
      url: { type: String, default: null },
      cloudinary_id: { type: String, default: null },
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("admin", AdministratorSchema);

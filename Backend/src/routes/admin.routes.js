const express = require("express");
const router = express.Router();
const { imageUpload } = require("./../middleware/common.middleware");
const {
  requireSignin,
  checkAdminValidity,
} = require("./../middleware/administrator/index");
const {
  createAdmin,
  login_admin,
  updateProfile,
  changePassword,
  getAdmin,
  deleteAdmin,
} = require("./../controller/admin.controller");
router.put("/admin", requireSignin, imageUpload.single("profile"), createAdmin);
router.post("/admin/login", login_admin);
router.post("/admin/check-validity", checkAdminValidity);
router.post(
  "/admin/update-profile",
  requireSignin,
  imageUpload.single("profile"),
  updateProfile
);
router.post("/admin/change-password", requireSignin, changePassword);
router.get("/admins", requireSignin, getAdmin);
router.delete("/admin/:id", requireSignin, deleteAdmin);
module.exports = router;

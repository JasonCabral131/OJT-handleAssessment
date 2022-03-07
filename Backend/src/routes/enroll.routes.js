const express = require("express");
const router = express.Router();
const { requireSignin } = require("./../middleware/administrator/index");
const {
  create,
  getStudentInfo,
  update,
  deleteEnrolled,
} = require("./../controller/enroll.constroller");
router.put("/enroll", requireSignin, create);
router.get("/enrolls", requireSignin, getStudentInfo);
router.post("/enroll", requireSignin, update);
router.delete("/enroll/:id", requireSignin, deleteEnrolled);
module.exports = router;

const express = require("express");
const router = express.Router();
const { requireSignin } = require("./../middleware/administrator/index");
const {
  create,
  updateCourse,
  deleteCourse,
} = require("./../controller/course.controller");
router.put("/course", requireSignin, create);
router.post("/course", requireSignin, updateCourse);
router.delete("/course/:id", requireSignin, deleteCourse);
module.exports = router;

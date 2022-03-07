const express = require("express");
const router = express.Router();
const { requireSignin } = require("./../middleware/administrator/index");
const {
  create,
  getStudents,
  getStudent,
  update,
  deleteStudent,
} = require("./../controller/student.controller");
router.put("/student", requireSignin, create);
router.post("/student", requireSignin, update);
router.get("/student", requireSignin, getStudents);
router.get("/student/:id", requireSignin, getStudent);
router.delete("/student/:id", requireSignin, deleteStudent);
module.exports = router;

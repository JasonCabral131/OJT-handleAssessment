const express = require("express");
const router = express.Router();
const { requireSignin } = require("./../middleware/administrator/index");
const {
  create,
  update,
  getColleges,
  getCollege,
} = require("./../controller/college.controller");
//create-college
router.put("/college", requireSignin, create);
//update-college
router.post("/college", requireSignin, update);
//get all colleges
router.get("/colleges", requireSignin, getColleges);
//get-college-data
router.get("/college/:id", requireSignin, getCollege);
//get-all-college
router.delete("/college/:id", requireSignin);

module.exports = router;

const express = require("express");
const router = express.Router();
const { requireSignin } = require("./../middleware/administrator/index");
const {
  create,
  update,
  getPrograms,
} = require("./../controller/program.controller");
router.put("/program", requireSignin, create);
router.post("/program", requireSignin, update);
router.get("/programs", requireSignin, getPrograms);
module.exports = router;

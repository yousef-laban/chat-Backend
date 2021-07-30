const express = require("express");
const router = express.Router();

const {
  fetchAllGroups,
  groupCreat,
} = require("../controllers/groupControllers");

router.get("/", fetchAllGroups);
router.post("/create", groupCreat);

module.exports = router;

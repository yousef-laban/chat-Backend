const express = require("express");
const passport = require("passport");

const {
  profileUpdate,
  fetchProfiles,
} = require("../controllers/profileControllers");

const router = express.Router();

const upload = require("../middleware/multer");

router.get("/", fetchProfiles);

router.post("/update", upload.single("image"), profileUpdate);

module.exports = router;

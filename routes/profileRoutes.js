const express = require("express");
const passport = require("passport"); //Remove unused import
const upload = require("../middleware/multer");
const {
  profileUpdate,
  fetchProfiles,
} = require("../controllers/profileControllers");

const router = express.Router();

router.get("/", fetchProfiles);

router.post("/update", upload.single("image"), profileUpdate); // Change to put

module.exports = router;

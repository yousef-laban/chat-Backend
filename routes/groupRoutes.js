const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

const {
  fetchAllGroups,
  groupCreat,
  DMCreat,
} = require("../controllers/groupControllers");

router.get("/", fetchAllGroups);
router.post("/create", DMCreat);
router.post("/create-group", upload.single("image"), groupCreat);

module.exports = router;

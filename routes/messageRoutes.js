const express = require("express");
const router = express.Router();

const {
  fetchAllMessages,
  messageCreat,
} = require("../controllers/messageControllers");

router.get("/", fetchAllMessages);
router.post("/create", messageCreat);

module.exports = router;

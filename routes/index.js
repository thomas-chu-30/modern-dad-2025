var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/chat", function (req, res, next) {
  res.render("chat", { title: "Chat" });
});

router.get("/mp3", function (req, res, next) {
  res.render("mp3", { title: "mp3" });
});

router.get("/aws-transcribe-request", function (req, res, next) {
  res.render("aws-transcribe-request", { title: "aws-transcribe-request" });
});

module.exports = router;

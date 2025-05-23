var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const qdrantUrl = process.env.QDRANT_URL;
  const qdrantApiKey = process.env.QDRANT_API_KEY;
  const openAiApiKey = process.env.OPENAI_API_KEY;

  console.log(qdrantUrl, qdrantApiKey, openAiApiKey);
  res.render("index", { title: "Express", qdrantUrl, qdrantApiKey, openAiApiKey });
});

module.exports = router;

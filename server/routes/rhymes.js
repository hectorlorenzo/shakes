var express = require("express");
var router = express.Router();
const { wordsRhyme } = require("../services/Phonetics");

/* GET home page. */
router.get("/:word1/:word2", function (req, res, next) {
  if (!req.params || !req.params.word1 || !req.params.word2) {
    throw new Error("You are missing one or two words.");
  }

  wordsRhyme(req.params.word1, req.params.word2).then(
    (phonetics) => {
      console.log("SUCCESS");
      res.send({
        status: 200,
        type: "SUCCESS",
        message: phonetics,
      });
    },
    (error) => {
      console.log("FAIL");
      res.send({
        status: 200,
        type: "ERROR",
        message: error,
      });
    }
  );
});

module.exports = router;

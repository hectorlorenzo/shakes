var express = require("express");
var router = express.Router();
const { getPhonetics } = require("../services/Phonetics");

/* GET home page. */
router.get("/:word", function (req, res, next) {
  if (!req.params || !req.params.word) {
    throw new Error("No word has been sent.");
  }

  getPhonetics(req.params.word).then(
    (response) => {
      res.send({
        status: 200,
        type: "SUCCESS",
        message: response,
      });
    },
    () => {
      res.send({
        status: 200,
        type: "ERROR",
        message: "Word was not found on our dictionary.",
      });
    }
  );
});

module.exports = router;

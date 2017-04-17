const express = require('express'),
      router = express.Router(),
      controller = require("../controllers/answer_controller"),
      token = require('../helpers/token');

router.get("/", token, controller.dataAnswer);
router.post("/", token, controller.createAnswer);
router.get("/:id", token, controller.updateAnswer);
router.post("/:id", token, controller.updateAnswerFinal);
router.post("/delete", token, controller.deleteAnswer);

module.exports = router;

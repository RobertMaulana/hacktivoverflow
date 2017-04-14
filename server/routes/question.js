const express = require('express'),
      router = express.Router(),
      controller = require("../controllers/question_controller"),
      helperPassport  = require('../helpers/passport'),
      token           = require('../helpers/token');

router.get("/", token, controller.dataQuestion);
router.get("/:id", token, controller.dataQuestionById);
router.post("/", token, controller.createQuestion);
router.put("/:id", token, controller.updateQuestion);
router.delete("/:id", token, controller.deleteQuestion);

module.exports = router;

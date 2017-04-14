const express = require('express'),
      router = express.Router(),
      controller = require("../controllers/answer_controller");

router.get("/", controller.dataAnswer);
router.post("/", controller.createAnswer);
router.get("/:id", controller.updateAnswer);
router.get("/upvote/:id", controller.upvoteAnswer);
router.get("/downvote/:id", controller.downvoteAnswer);
router.post("/:id", controller.updateAnswerFinal);
router.delete("/:id", controller.deleteAnswer);

module.exports = router;

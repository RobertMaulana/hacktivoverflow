const express = require('express'),
      router = express.Router(),
      controller = require("../controllers/comment_controller"),
      token = require('../helpers/token');

router.get("/", token, controller.dataComment);
router.post("/", token, controller.createComment);
router.put("/:id", token, controller.updateComment);
router.delete("/:id", token, controller.deleteComment);

module.exports = router;

const express = require('express'),
      router = express.Router(),
      controller = require("../controllers/comment_controller");

router.get("/", controller.dataComment);
router.post("/", controller.createComment);
router.put("/:id", controller.updateComment);
router.delete("/:id", controller.deleteComment);

module.exports = router;

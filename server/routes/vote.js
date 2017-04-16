const express = require('express'),
      router = express.Router(),
      controller = require("../controllers/vote_controller"),
      token = require('../helpers/token');

router.post("/upvote", token, controller.upvote);
router.post("/downvote", token, controller.downvote);

module.exports = router;

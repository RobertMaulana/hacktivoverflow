const express = require('express'),
      router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to stack and overflow...!")
})

module.exports = router;

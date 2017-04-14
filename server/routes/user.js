const express         = require('express'),
      router          = express.Router(),
      controller      = require("../controllers/user_controller"),
      helperPassport  = require('../helpers/passport'),
      token           = require('../helpers/token');

router.post("/login", helperPassport, controller.loginUser);
router.get("/", token, controller.dataUser);
router.post("/", token, controller.createUser);
router.put("/:id", token, controller.updateUser);
router.delete("/:id", token, controller.deleteUser);

module.exports = router;

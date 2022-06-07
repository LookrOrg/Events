const express = require("express");
const router = express.Router();
const indexController = require("../controllers/App")

router.get("/checkEmail", indexController.checkEmail)
router.get("/checkHandle", indexController.checkHandle)

router.post("/login", indexController.login)
router.post("/signup", indexController.signup)


module.exports = router;
const express = require("express");
const router = express.Router();
const userController = require("../controllers/User");
const auth = require("../utils/Auth")

router.use(auth)

//restituisce utente loggato
router.get("/", userController.getUserAuth)

//restituisce un utente dato l'handle
router.get("/:handle", userController.getUserByHandle)

//aumenta il rating
router.put("/addRating", userController.addRating)

//diminuisce il rating
router.put("/removeRating", userController.removeRating)
module.exports = router;

const express = require("express");
const router = express.Router();
const userController = require("../controllers/User");
const auth = require("../utils/Auth")
const multer = require('multer')
const upload = multer({dest: "uploads/"});

router.use(auth)

//restituisce utente loggato
router.get("/", userController.getUserAuth)

//restituisce un utente dato l'handle
router.get("/:handle", userController.getUserByHandle)

//aumenta il rating
router.put("/addRating", userController.addRating)

//diminuisce il rating
router.put("/removeRating", userController.removeRating)

//cambia le informazioni dell'utente
router.put("/change", userController.changeUserInfo)

router.put('/uploadImage', upload.single('foto'), userController.uploadImage)
module.exports = router;

// routes/auth.routes.js
// Rotte per la parte di login, registrazione e profilo utente

const express = require("express");
const router = express.Router();
const { register, login, me } = require("../controllers/auth.controller");
const { auth } = require("../middleware/auth");

router.post("/register", register); // Crea utente
router.post("/login", login);       // Effettua login
router.get("/me", auth, me);        // Dati utente loggato

module.exports = router;

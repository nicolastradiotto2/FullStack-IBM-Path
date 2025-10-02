const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();

// Array temporaneo dove salviamo gli utenti
let utenti = [];

// Rotta registrazione
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // controllo campi obbligatori
    if (!username || !password) {
      return res.status(400).json({ msg: "Inserisci username e password" });
    }

    // controlla se esiste già
    const utenteEsistente = utenti.find((u) => u.username === username);
    if (utenteEsistente) {
      return res.status(400).json({ msg: "Utente già registrato" });
    }

    // criptiamo la password (salt = 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // creiamo il nuovo utente
    const nuovoUtente = { username, password: hashedPassword };
    utenti.push(nuovoUtente);

    res.status(201).json({ msg: "Registrazione completata ✅", utente: username });
  } catch (error) {
    res.status(500).json({ msg: "Errore server", error });
  }
});

module.exports = router;

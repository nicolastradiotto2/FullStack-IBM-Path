const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Array temporaneo dove salviamo gli utenti
let utenti = [];

// Registrazione utente
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ msg: "Inserisci username e password" });
    }

    const utenteEsistente = utenti.find((u) => u.username === username);
    if (utenteEsistente) {
      return res.status(400).json({ msg: "Utente già registrato" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuovoUtente = { username, password: hashedPassword };
    utenti.push(nuovoUtente);

    res.status(201).json({ msg: "Registrazione completata ✅", utente: username });
  } catch (error) {
    res.status(500).json({ msg: "Errore server", error });
  }
});

// Login utente
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // controlliamo se l'utente esiste
    const utente = utenti.find((u) => u.username === username);
    if (!utente) {
      return res.status(400).json({ msg: "Credenziali non valide ❌" });
    }

    // confrontiamo la password inserita con quella criptata salvata
    const match = await bcrypt.compare(password, utente.password);
    if (!match) {
      return res.status(400).json({ msg: "Credenziali non valide ❌" });
    }

    // generiamo il token JWT
    const token = jwt.sign(
      { username: utente.username }, // payload (dati contenuti nel token)
      "segretoSuper123",             // chiave segreta
      { expiresIn: "1h" }            // durata token
    );

    res.json({ msg: "Login riuscito ✅", token });
  } catch (error) {
    res.status(500).json({ msg: "Errore server", error });
  }
});

module.exports = router;

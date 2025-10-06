const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// DB finto in memoria (si resetta ad ogni riavvio)
let utenti = [];

// POST /auth/register
async function registerUser(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ msg: "Inserisci username e password" });

    const esiste = utenti.find(u => u.username === username);
    if (esiste) return res.status(400).json({ msg: "Utente già registrato" });

    const hashed = await bcrypt.hash(password, 10);
    utenti.push({ username, password: hashed });

    return res.status(201).json({ msg: "Registrazione completata ✅", utente: username });
  } catch (err) {
    return res.status(500).json({ msg: "Errore server", err: String(err) });
  }
}

// POST /auth/login
async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const utente = utenti.find(u => u.username === username);
    if (!utente) return res.status(400).json({ msg: "Credenziali non valide ❌" });

    const ok = await bcrypt.compare(password, utente.password);
    if (!ok) return res.status(400).json({ msg: "Credenziali non valide ❌" });

    const token = jwt.sign({ username: utente.username }, "segretoSuper123", { expiresIn: "1h" });
    return res.json({ msg: "Login riuscito ✅", token });
  } catch (err) {
    return res.status(500).json({ msg: "Errore server", err: String(err) });
  }
}

// GET /auth/profile (protetta)
function getProfile(req, res) {
  return res.json({
    msg: "Benvenuto nella tua area riservata 🔒",
    user: req.user.username
  });
}

module.exports = { registerUser, loginUser, getProfile };

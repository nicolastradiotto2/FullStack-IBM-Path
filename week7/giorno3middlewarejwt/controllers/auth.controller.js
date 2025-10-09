const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Funzione che crea il token (lo useremo nel login e nella registrazione)
function creaToken(user) {
  return jwt.sign(
    { userId: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" } // scade dopo 1 giorno
  );
}

//  Registrazione
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Controlliamo se esiste già
    const esiste = await User.findOne({ username });
    if (esiste) return res.status(400).json({ error: "Username già esistente" });

    // Creiamo l’utente
    const nuovoUtente = await User.create({ username, password });

    // Creiamo il token per l’utente appena registrato
    const token = creaToken(nuovoUtente);

    res.status(201).json({
      msg: "Registrazione completata ",
      token,
      user: { id: nuovoUtente._id, username: nuovoUtente.username },
    });
  } catch (err) {
      console.error("❌ Errore preciso:", err.message);
      res.status(500).json({ error: "Errore durante la registrazione" });
  }
};

//  Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Cerchiamo l’utente nel DB
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Utente non trovato" });

    // Controlliamo se la password è corretta
    const match = await user.comparePassword(password);
    if (!match) return res.status(400).json({ error: "Password errata" });

    // Generiamo un nuovo token
    const token = creaToken(user);

    res.json({
      msg: "Login effettuato ",
      token,
      user: { id: user._id, username: user.username, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ error: "Errore durante il login" });
  }
};

//  Ritorna i dati dell’utente loggato
exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Errore nel recupero utente" });
  }
};

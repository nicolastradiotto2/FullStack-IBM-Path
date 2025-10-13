// middleware/auth.js
// Questo file serve a controllare se l’utente ha un token valido (cioè se è loggato)

const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  // Cerchiamo il token dentro l’header della richiesta
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;

  // Se non c’è il token, blocchiamo la richiesta
  if (!token) return res.status(401).json({ error: "Devi fare il login" });

  try {
    // Verifichiamo che il token sia valido
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Salviamo i dati dell’utente nel request per poterli usare dopo
    req.user = decoded; // contiene userId, username, role
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token non valido o scaduto" });
  }
}

module.exports = { auth };

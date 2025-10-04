const jwt = require("jsonwebtoken");

// Middleware di autenticazione
function authMiddleware(req, res, next) {
  // leggiamo l'header Authorization
  const authHeader = req.headers["authorization"];

  // se non c’è token → errore
  if (!authHeader) {
    return res.status(401).json({ msg: "Token mancante ❌" });
  }

  // il token di solito arriva come: "Bearer eyJhbGciOi..."
  const token = authHeader.split(" ")[1];

  // se non c’è token dopo Bearer
  if (!token) {
    return res.status(401).json({ msg: "Token non valido ❌" });
  }

  try {
    // verifichiamo il token
    const decoded = jwt.verify(token, "segretoSuper123");
    req.user = decoded; // salviamo i dati decodificati dentro req.user
    next(); // passiamo alla rotta successiva
  } catch (error) {
    return res.status(403).json({ msg: "Token non valido o scaduto ❌" });
  }
}

module.exports = authMiddleware;

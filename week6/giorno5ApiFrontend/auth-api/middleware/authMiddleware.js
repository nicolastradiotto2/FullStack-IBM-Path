const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ msg: "Token mancante ❌" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Token non valido ❌" });

  try {
    const decoded = jwt.verify(token, "segretoSuper123");
    req.user = decoded;            // es: { username: "nicola", iat, exp }
    next();
  } catch {
    return res.status(403).json({ msg: "Token non valido o scaduto ❌" });
  }
}

module.exports = authMiddleware;

const express = require("express");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Importa le rotte
const prodottiRoutes = require("./routes/prodottiRoutes");
app.use("/prodotti", prodottiRoutes);

// Rotta base
app.get("/", (req, res) => {
  res.send("Benvenuto nella mia API CRUD 🚀");
});

app.listen(PORT, () => {
  console.log(`Server attivo su http://localhost:${PORT}`);
});

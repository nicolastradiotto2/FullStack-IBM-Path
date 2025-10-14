require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbconnection");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const { notFound, errorHandler } = require("./middleware/error");

const app = express();


const allowedOrigins = [
  "http://localhost:4000",    // test locale
  "http://localhost:5500",    // Live Server locale
  "https://full-stack-ibm-path-6ezx.vercel.app", // dominio precedente Vercel
  "https://full-stack-ibm-path-77jx-htgoshngs-nicola-stradiottos-projects.vercel.app" // dominio attuale Vercel
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  // metodi permessi
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  // header permessi
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // se in futuro serviranno cookie o token con credenziali
  res.header("Access-Control-Allow-Credentials", "true");


  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});


app.use(express.json());


app.get("/api/health", (req, res) => res.json({ ok: true }));


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);


app.use(express.static("public"));


app.get("/", (req, res) => {
  res.send("✅ Server funzionante + MongoDB connesso!");
});


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`🌍 Server attivo su http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ Errore di connessione al DB:", err.message);
    process.exit(1);
  });

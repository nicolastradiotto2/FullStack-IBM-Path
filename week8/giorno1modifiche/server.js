require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbconnection");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const { notFound, errorHandler } = require("./middleware/error");

const app = express();

//  CORS 
app.use(cors({
  origin: [
    'http://localhost:4000',   
    'http://localhost:5500',   
    'https://full-stack-ibm-path-77jx.vercel.app',
    'https://full-stack-ibm-path-77jx-htgoshngs-nicola-stradiottos-projects.vercel.app'
  ],
  credentials: true
}));

//  Middleware JSON
app.use(express.json());

//  Healthcheck 
app.get("/api/health", (req, res) => res.json({ ok: true }));

//  Rotte API
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);

//  Static )
app.use(express.static("public"));

//  Rotta base
app.get("/", (req, res) => {
  res.send("server funzionante + mongo funzionante");
});

//  Gestione errori
app.use(notFound);
app.use(errorHandler);

//  Porta dinamica 
const PORT = process.env.PORT || 4000;

//  Connessione al DB + avvio server
connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () =>
    console.log(`🌍 Server attivo su http://localhost:${PORT}`)
  );
});

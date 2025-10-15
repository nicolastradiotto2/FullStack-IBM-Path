require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbconnection");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const { notFound, errorHandler } = require("./middleware/error");

const app = express();

// =============================
// ✅ CORS DEFINITIVO
// =============================
const allowedOrigins = [
  "http://localhost:4000",
  "http://localhost:5500",
  "https://full-stack-ibm-path-6ezx.vercel.app",
  "https://full-stack-ibm-path-77jx-htgoshngs-nicola-stradiottos-projects.vercel.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    // Se non c’è origin (es. Postman) o è nella lista, consenti
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ CORS bloccato per:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200 // evita problemi con browser vecchi
};

app.use(cors(corsOptions));


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
    console.error("❌ Errore connessione DB:", err.message);
    process.exit(1);
  });

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbconnection");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const { notFound, errorHandler } = require("./middleware/error");

const app = express();

// CORS dinamico (accetta localhost e tutti i subdomini Vercel che iniziano per "full-stack-ibm-path")
const baseAllow = new Set([
  "http://localhost:4000",
  "http://localhost:5500",
]);

function isAllowedOrigin(origin) {
  if (!origin) return true; // Postman/cURL
  if (baseAllow.has(origin)) return true;
  try {
    const u = new URL(origin);
    return u.hostname.endsWith(".vercel.app") && u.hostname.startsWith("full-stack-ibm-path");
  } catch {
    return false;
  }
}

const corsOptions = {
  origin: (origin, cb) => {
    const ok = isAllowedOrigin(origin);
    return ok ? cb(null, true) : cb(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // preflight

app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);

app.use(express.static("public"));
app.get("/", (req, res) => res.send("✅ Server funzionante + MongoDB connesso!"));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
connectDB(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`🌍 Server attivo su http://localhost:${PORT}`)))
  .catch((err) => {
    console.error("❌ Errore connessione DB:", err.message);
    process.exit(1);
  });

require("dotenv").config();
const express = require("express");
const connectDB = require("./config/dbconnection");
const authRoutes = require("./routes/auth.routes");     
const productRoutes = require("./routes/product.routes");
const { notFound, errorHandler } = require("./middleware/error");

const app = express();


app.use((req, res, next) => {
  const origin = req.headers.origin || "*";
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Vary", "Origin");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    req.headers["access-control-request-headers"] || "Content-Type, Authorization"
  );
  if (req.method === "OPTIONS") return res.sendStatus(204); 
  next();
});

app.use(express.json());


app.get("/api/health", (_req, res) => res.json({ ok: true }));


app.use("/api/v1/auth", authRoutes);          
app.use("/api/v1/products", productRoutes);  


app.use(express.static("public"));
app.get("/", (_req, res) => res.send("✅ Server up, CORS aperto, nessuna autenticazione."));


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
connectDB(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`🌍 Server on http://localhost:${PORT}`)))
  .catch((err) => {
    console.error("DB connect error:", err.message);
    process.exit(1);
  });

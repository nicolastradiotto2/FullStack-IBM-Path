require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbconnection");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const { notFound, errorHandler } = require("./middleware/error");

const app = express();


app.use(cors({
  origin: [
    'http://localhost:4000',   
    'http://localhost:5500'    
  ],
  credentials: false
}));

app.use(express.json());


app.get("/api/health", (req, res) => res.json({ ok: true }));


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);


app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("server funzionante + mongo funzionante");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(` Server attivo su http://localhost:${PORT}`));
});

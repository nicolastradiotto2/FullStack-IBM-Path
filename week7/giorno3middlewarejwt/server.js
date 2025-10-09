require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbconnection")
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);

app.get("/", (req,res) => {
    res.send("server funzionante + mongo funzionante")

})

const PORT = process.env.PORT || 4000;

connectDB(process.env.MONGO_URI).then(()=>{
    app.listen(PORT, () => console.log(` Server attivo su http://localhost:${PORT}`))
})
const express = require ("express");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 5000;

app.use(express.json());

app.use("/auth",authRoutes);

app.get("/", (req,res) => {
    res.send("Server attivo");
})

app.listen(PORT, () => {
    console.log(`Server attivo su http://localhost:${PORT}`)
})
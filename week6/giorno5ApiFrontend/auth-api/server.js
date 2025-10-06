const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 5000;

app.use(cors());            // consente chiamate dal client (5173)
app.use(express.json());    // per leggere JSON nel body

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server attivo 🚀");
});

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});

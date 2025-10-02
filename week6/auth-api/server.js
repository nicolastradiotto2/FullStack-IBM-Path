const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/", (req,res) => {
    res.send("Server attivo");
});


app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`)
})
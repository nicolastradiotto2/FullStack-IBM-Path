require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbconnection")

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
    res.send("server funzionante + mongo funzionante")

})

const PORT = process.env.PORT || 4000;

connectDB(process.env.MONGO_URI).then(()=>{
    app.listen(PORT, () => console.log(` Server attivo su http://localhost:${PORT}`))
})
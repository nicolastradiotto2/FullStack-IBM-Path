const mongoose = require("mongoose");

async function connectDB(uri){
    try{
        await mongoose.connect(uri ,{dbName: "week7_db"});
        console.log("Connessione a mongoDB riuscita");
    } catch (err){
        console.error("Errore connesione mongo:", err.message);
        process.exit(1);
    }
}

module.exports = connectDB;
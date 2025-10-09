const mongoose = require("mongoose");
const User = require("./models/User");

async function test() {
  try {
    await mongoose.connect("mongodb+srv://nicolastradiotto2:Nicola123nose@week7db.zmridzb.mongodb.net/?retryWrites=true&w=majority&appName=week7db");
    console.log("Connessione riuscita!");

    const nuovoUtente = await User.create({ username: "Nicola", password: "123456" });
    console.log("Utente creato:", nuovoUtente);
  } catch (err) {
    console.error("Errore:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("Connessione chiusa");
  }
}

test();

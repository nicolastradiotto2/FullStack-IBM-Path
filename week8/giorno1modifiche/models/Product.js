const mongoose = require("mongoose");

//  Struttura base del prodotto
const productSchema = new mongoose.Schema(
  {
    // Nome del prodotto
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Prezzo del prodotto (non può essere negativo)
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    // Disponibilità in magazzino (true = disponibile)
    inStock: {
      type: Boolean,
      default: true,
    },

    // Collega il prodotto all'utente che lo ha creato (una sorta di "proprietario")
    owner: {
      type: mongoose.Schema.Types.ObjectId, // ID dell’utente
      ref: "User",                          // riferimento al modello User
    },
  },

  // Anche qui vogliamo i campi "createdAt" e "updatedAt"
  { timestamps: true }
);

// Esportiamo il modello Product
module.exports = mongoose.model("Product", productSchema);

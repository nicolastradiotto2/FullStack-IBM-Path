const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//  Struttura base del nostro utente
const userSchema = new mongoose.Schema(
  {
    // Nome dell’utente (deve essere unico e non troppo corto)
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },

    // Password che verrà salvata in modo criptato
    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // Ruolo: per ora può essere "user" o "admin"
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },

  // Questo aggiunge in automatico "createdAt" e "updatedAt"
  { timestamps: true }
);

userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  }
});


//  Prima di salvare un nuovo utente nel database...
userSchema.pre("save", async function (next) {
  // Se la password non è stata modificata, non fare niente
  if (!this.isModified("password")) return next();

  // Genera un "sale" casuale per rendere l’hash più sicuro
  const salt = await bcrypt.genSalt(10);

  // Cifra la password vera e sostituiscila con quella criptata
  this.password = await bcrypt.hash(this.password, salt);

  // Procedi con il salvataggio
  next();
});

// Metodo per confrontare la password scritta dall’utente con quella salvata nel DB
userSchema.methods.comparePassword = function (passwordInserita) {
  return bcrypt.compare(passwordInserita, this.password);
};

// Esportiamo il modello in modo che possa essere importato in altri file
module.exports = mongoose.model("User", userSchema);

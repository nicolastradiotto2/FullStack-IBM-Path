const fs = require("fs");

// funzione per leggere i dati dal file
function leggiProdotti() {
  const dati = fs.readFileSync("data.json");
  return JSON.parse(dati).prodotti;
}

// funzione per salvare i dati
function salvaProdotti(prodotti) {
  fs.writeFileSync("data.json", JSON.stringify({ prodotti }, null, 2));
}

// CONTROLLER CRUD
exports.getProdotti = (req, res) => {
  res.json(leggiProdotti());
};

exports.addProdotto = (req, res) => {
  const nuovo = req.body.nome;
  if (!nuovo) return res.status(400).json({ errore: "Nome prodotto mancante" });

  const prodotti = leggiProdotti();
  prodotti.push(nuovo);
  salvaProdotti(prodotti);
  res.status(201).json(prodotti);
};

exports.updateProdotto = (req, res) => {
  const id = req.params.id;
  const nuovoNome = req.body.nome;
  const prodotti = leggiProdotti();

  if (!prodotti[id]) return res.status(404).json({ errore: "Prodotto non trovato" });

  prodotti[id] = nuovoNome;
  salvaProdotti(prodotti);
  res.json(prodotti);
};

exports.deleteProdotto = (req, res) => {
  const id = req.params.id;
  const prodotti = leggiProdotti();

  if (!prodotti[id]) return res.status(404).json({ errore: "Prodotto non trovato" });

  prodotti.splice(id, 1);
  salvaProdotti(prodotti);
  res.json(prodotti);
};

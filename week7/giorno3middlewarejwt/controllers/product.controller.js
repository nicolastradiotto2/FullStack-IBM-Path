const Product = require("../models/Product");

//  Crea un nuovo prodotto
exports.createProduct = async (req, res) => {
  try {
    const nuovo = await Product.create({
      name: req.body.name,
      price: req.body.price,
      inStock: req.body.inStock,
      owner: req.user.userId, // collego il prodotto a chi lo ha creato
    });
    res.status(201).json({ msg: "Prodotto aggiunto ", product: nuovo });
  } catch (err) {
    res.status(400).json({ error: "Errore nella creazione del prodotto" });
  }
};

// 👉 Mostra tutti i prodotti
exports.getProducts = async (req, res) => {
  try {
    const prodotti = await Product.find().populate("owner", "username");
    res.json({ products: prodotti });
  } catch (err) {
    res.status(500).json({ error: "Errore nel caricamento dei prodotti" });
  }
};

//  Mostra un prodotto specifico
exports.getProductById = async (req, res) => {
  try {
    const prodotto = await Product.findById(req.params.id).populate("owner", "username");
    if (!prodotto) return res.status(404).json({ error: "Prodotto non trovato" });
    res.json({ product: prodotto });
  } catch (err) {
    res.status(500).json({ error: "Errore nel caricamento prodotto" });
  }
};

//  Aggiorna un prodotto
exports.updateProduct = async (req, res) => {
  try {
    const prodotto = await Product.findById(req.params.id);
    if (!prodotto) return res.status(404).json({ error: "Prodotto non trovato" });

    // Solo il proprietario o admin possono modificare
    if (prodotto.owner.toString() !== req.user.userId)
      return res.status(403).json({ error: "Non hai i permessi" });

    // Aggiorniamo i campi passati nel body
    Object.assign(prodotto, req.body);
    await prodotto.save();

    res.json({ msg: "Prodotto aggiornato ", product: prodotto });
  } catch (err) {
    res.status(500).json({ error: "Errore nell'aggiornamento" });
  }
};

//  Elimina un prodotto
exports.deleteProduct = async (req, res) => {
  try {
    const prodotto = await Product.findById(req.params.id);
    if (!prodotto) return res.status(404).json({ error: "Prodotto non trovato" });

    if (prodotto.owner.toString() !== req.user.userId)
      return res.status(403).json({ error: "Non hai i permessi" });

    await prodotto.deleteOne();
    res.json({ msg: "Prodotto eliminato " });
  } catch (err) {
    res.status(500).json({ error: "Errore durante l'eliminazione" });
  }
};

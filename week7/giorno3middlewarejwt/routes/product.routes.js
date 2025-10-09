// routes/product.routes.js
// Rotte per i prodotti (pubbliche e protette)

const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

// Pubbliche
router.get("/", getProducts);
router.get("/:id", getProductById);

// Protette (solo utenti loggati)
router.post("/", auth, createProduct);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

module.exports = router;

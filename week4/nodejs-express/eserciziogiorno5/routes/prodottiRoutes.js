const express = require("express");
const router = express.Router();
const controller = require("../controllers/prodottiController");

// CRUD
router.get("/", controller.getProdotti);
router.post("/", controller.addProdotto);
router.put("/:id", controller.updateProdotto);
router.delete("/:id", controller.deleteProdotto);

module.exports = router;

const express = require("express");
const { createProduct, getProducts, updateProduct, deleteProduct } = require("../controllers/ProductController");

const router = express.Router();

router.post("/create", createProduct);
router.get("/", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;

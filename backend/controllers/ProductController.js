const Product = require("../models/Products");

const createProduct = async (req, res) => {
    try {
        const { name, category, price, stock, supplier } = req.body;
        const product = new Product({ name, category, price, stock, supplier });
        await product.save();
        res.status(201).json({ message: "Product created successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, price, stock, supplier } = req.body;
        const product = await Product.findByIdAndUpdate(id, { name, category, price, stock, supplier }, { new: true });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.json({ message: "Product deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };

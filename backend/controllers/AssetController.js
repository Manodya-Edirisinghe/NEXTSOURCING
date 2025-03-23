const Asset = require("../models/Assets");

const createAsset = async (req, res) => {
    try {
        const { name, category, price, stock, supplier } = req.body; // Updated field names
        const asset = new Asset({ name, category, price, stock, supplier });
        await asset.save();
        res.status(201).json({ message: "Asset created successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAssets = async (req, res) => {
    try {
        const assets = await Asset.find();
        res.json(assets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, price, stock, supplier } = req.body; // Updated field names
        const asset = await Asset.findByIdAndUpdate(id, { name, category, price, stock, supplier }, { new: true });
        res.json(asset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteAsset = async (req, res) => {
    try {
        const { id } = req.params;
        await Asset.findByIdAndDelete(id);
        res.json({ message: "Asset deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createAsset, getAssets, updateAsset, deleteAsset };

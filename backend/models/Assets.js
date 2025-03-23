const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    supplier: { type: String, required: true },
});

const Asset = mongoose.model("Asset", assetSchema);
module.exports = Asset;

const express = require("express");
const { createAsset, getAssets, updateAsset, deleteAsset } = require("../controllers/AssetController");

const router = express.Router();

router.post("/create", createAsset);
router.get("/", getAssets);
router.put("/:id", updateAsset);
router.delete("/:id", deleteAsset);

module.exports = router;

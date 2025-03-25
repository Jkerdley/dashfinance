const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");

const router = express.Router({ mergeParams: true });
const authentificated = require("../middleware/authentificated");
const cryptoAssetsMap = require("../helpers/cryptoAssetsMap");
const { getCryptoAssets } = require("../controllers/cryptoassets");
const CryptoAssets = require("../models/CryptoAssets");

router.get("/cryptoassets", authentificated, async (req, res) => {
    const cryptoAssets = await getCryptoAssets(req.user._id);
    res.send({
        cryptoAssets: cryptoAssets.map(cryptoAssetsMap),
    });
});

router.post("/cryptoassets", authentificated, async (req, res) => {
    console.log("req.body", req.body);

    try {
        const assetWithUserId = { ...req.body, userId: req.user._id };
        const cryptoAssets = await CryptoAssets.create(assetWithUserId);
        res.status(200).send({
            error: null,
        });
    } catch (error) {
        res.status(400).send({
            error: error.message,
        });
    }
});

module.exports = router;

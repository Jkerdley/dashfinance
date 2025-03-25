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
    const findedSimilarAsset = await CryptoAssets.findOne({
        userId: req.user._id,
        $or: [{ name: req.body.name }, { coinId: req.body.coinId }],
    });
    if (findedSimilarAsset) {
        res.status(500).send({
            error: "Такой актив уже есть в Вашем портфеле",
        });
    } else {
        try {
            const assetWithUserId = {
                name: req.body.name,
                coinId: req.body.coinId,
                symbol: req.body.symbol,
                averagePrice: req.body.averagePrice,
                assetAmount: req.body.assetAmount,
                history: req.body.history,
                userId: req.user._id,
            };
            await CryptoAssets.create(assetWithUserId);
            res.status(200).send({
                error: null,
            });
        } catch (error) {
            res.status(500).send({
                error: error.message,
            });
        }
    }
});

module.exports = router;

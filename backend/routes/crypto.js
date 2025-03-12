const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");

const router = express.Router({ mergeParams: true });
const authentificated = require("../middleware/authentificated");
const cryptoAssetsMap = require("../helpers/cryptoAssetsMap");
const { getCryptoAssets } = require("../controllers/cryptoassets");

router.get("/cryptoassets", authentificated, async (req, res) => {
    const cryptoAssets = await getCryptoAssets(req.user._id);
    res.send({
        cryptoAssets: cryptoAssets.map(cryptoAssetsMap),
    });
});

module.exports = router;

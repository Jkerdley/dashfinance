const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const {
    getHistory,
    getAccounts,
    getCategories,
    getCryptoAssets,
    addHistoryItem,
} = require("../controllers/finances");
const historyMap = require("../helpers/historyMap");
const categoriesMap = require("../helpers/categoriesMap");
const accountsMap = require("../helpers/accountsMap");
const cryptoAssetsMap = require("../helpers/cryptoAssetsMap");
const authentificated = require("../middleware/authentificated");

const router = express.Router({ mergeParams: true });

router.get("/history", authentificated, async (req, res) => {
    const history = await getHistory(req.user._id);
    res.send({
        history: history.map(historyMap),
    });
});
router.post("/history", authentificated, async (req, res) => {
    try {
        const newHistoryItem = await addHistoryItem(req.body, req.user._id);
        res.send(newHistoryItem);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
router.get("/cryptoassets", authentificated, async (req, res) => {
    const cryptoAssets = await getCryptoAssets(req.user._id);
    res.send({
        cryptoAssets: cryptoAssets.map(cryptoAssetsMap),
    });
});

router.get("/accounts", authentificated, async (req, res) => {
    const accounts = await getAccounts(req.user._id);
    res.send({
        accounts: accounts.map(accountsMap),
    });
});
router.get("/categories", authentificated, async (req, res) => {
    const categories = await getCategories(req.user._id);
    res.send({
        categories: categories.map(categoriesMap),
    });
});

// router.delete("/categories/:id", async (req, res) => {
//     const requestedId = req.params.id;
//     // const { accounts, categories, history } = await getFinanceData();
//     // res.send({ data: accounts, categories, history });
// });

module.exports = router;

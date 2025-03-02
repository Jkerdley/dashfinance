const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const {
    getHistory,
    getCryptoHistory,
    getAccounts,
    getCategories,
    getCryptoAssets,
} = require("../controllers/finances");
const historyMap = require("../helpers/historyMap");
const cryptohistoryMap = require("../helpers/cryptohistoryMap");
const categoriesMap = require("../helpers/categoriesMap");
const accountsMap = require("../helpers/accountsMap");
const cryptoAssetsMap = require("../helpers/cryptoAssetsMap");

const router = express.Router({ mergeParams: true });

router.get("/history", async (req, res) => {
    const history = await getHistory();
    res.send({
        history: history.map(historyMap),
    });
});
router.get("/cryptohistory", async (req, res) => {
    const cryptohistory = await getCryptoHistory();
    res.send({
        cryptohistory: cryptohistory.map(cryptohistoryMap),
    });
});
router.get("/cryptoassets", async (req, res) => {
    const cryptoAssets = await getCryptoAssets();
    res.send({
        cryptoAssets: cryptoAssets.map(cryptoAssetsMap),
    });
});

router.get("/accounts", async (req, res) => {
    const accounts = await getAccounts();
    res.send({
        accounts: accounts.map(accountsMap),
    });
});
router.get("/categories", async (req, res) => {
    const categories = await getCategories();
    res.send({
        categories: categories.map(categoriesMap),
    });
});

router.delete("/:id", async (req, res) => {
    const requestedId = req.body.id;
    // const { accounts, categories, history } = await getFinanceData();
    // res.send({ data: accounts, categories, history });
});

module.exports = router;

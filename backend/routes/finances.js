const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const {
    getHistory,
    getAccounts,
    getCategories,
    getCryptoAssets,
    addHistoryItem,
    addAccount,
    addCategory,
} = require("../controllers/finances");
const historyMap = require("../helpers/historyMap");
const categoriesMap = require("../helpers/categoriesMap");
const accountsMap = require("../helpers/accountsMap");
const cryptoAssetsMap = require("../helpers/cryptoAssetsMap");
const authentificated = require("../middleware/authentificated");
const Accounts = require("../models/Acounts");
const Categories = require("../models/Categories");
const History = require("../models/History");

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

router.delete("/history/:id", authentificated, async (req, res) => {
    console.log("id in delete in history", req.params.id);

    try {
        const deletedItem = await History.findByIdAndDelete(req.params.id);
        if (deletedItem) {
            const accountToAddBalance = await Accounts.findByIdAndUpdate(deletedItem.accountId, {
                $inc: { balance: deletedItem.amount },
            });
            console.log("deletedItem", deletedItem);
            console.log("accountToAddBalance", accountToAddBalance);
        }
        res.send({ message: `Операция ${req.params.id} была удалена` });
    } catch (error) {
        res.status(400).send({ error: error.message });
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
router.post("/accounts", authentificated, async (req, res) => {
    try {
        const newAccount = await addAccount(req.body, req.user._id);
        res.status(201).send(newAccount);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.delete("/accounts/:id", authentificated, async (req, res) => {
    try {
        await Accounts.findByIdAndDelete(req.params.id);
        res.send({ message: `Счет номер ${req.params.id} был удален` });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.put("/accounts/:id", authentificated, async (req, res) => {
    try {
        await Accounts.findByIdAndUpdate(req.params.id, req.body);
        res.send({ message: `Счет успешно обновлен` });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.get("/categories", authentificated, async (req, res) => {
    const categories = await getCategories(req.user._id);
    res.send({
        categories: categories.map(categoriesMap),
    });
});

router.post("/categories", authentificated, async (req, res) => {
    try {
        const newCategory = await addCategory(req.body, req.user._id);
        res.status(201).send(newCategory);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.delete("/categories/:id", authentificated, async (req, res) => {
    try {
        await Categories.findByIdAndDelete(req.params.id);
        res.send({ message: `Категория номер ${req.params.id} была удалена` });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.put("/categories/:id", authentificated, async (req, res) => {
    try {
        await Categories.findByIdAndUpdate(req.params.id, req.body);
        res.send({ message: `Категория успешно обновлена` });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// router.delete("/categories/:id", async (req, res) => {
//     const requestedId = req.params.id;
//     // const { accounts, categories, history } = await getFinanceData();
//     // res.send({ data: accounts, categories, history });
// });

module.exports = router;

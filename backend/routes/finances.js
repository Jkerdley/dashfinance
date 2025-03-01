const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const { getFinanceData } = require("../controllers/finances");
const historyMap = require("../helpers/historyMap");
const cryptohistoryMap = require("../helpers/cryptohistoryMap");
const categoriesMap = require("../helpers/categoriesMap");
const accountsMap = require("../helpers/accountsMap");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
    const { accounts, categories, history, cryptohistory } = await getFinanceData();
    res.send({
        accounts: accounts.map(accountsMap),
        categories: categories.map(categoriesMap),
        history: history.map(historyMap),
        cryptohistory: cryptohistory.map(cryptohistoryMap),
    });
});

router.delete("/:id", async (req, res) => {
    const requestedId = req.body.id;
    // const { accounts, categories, history } = await getFinanceData();
    // res.send({ data: accounts, categories, history });
});

module.exports = router;

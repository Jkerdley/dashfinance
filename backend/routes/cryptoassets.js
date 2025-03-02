const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const { getCryptoHistory } = require("../controllers/finances");

const cryptohistoryMap = require("../helpers/cryptohistoryMap");

const router = express.Router({ mergeParams: true });

router.get("/cryptohistory", async (req, res) => {
    const cryptohistory = await getCryptoHistory();
    res.send({
        cryptohistory: cryptohistory.map(cryptohistoryMap),
    });
});

router.delete("/:id", async (req, res) => {
    const requestedId = req.body.id;
    // const { accounts, categories, history } = await getFinanceData();
    // res.send({ data: accounts, categories, history });
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const chalk = require("chalk");
const { getUser } = require("../controllers/user");
const authentificated = require("../middleware/authentificated");

const router = express.Router({ mergeParams: true });

router.get("/", authentificated, async (req, res) => {
    const { login, password } = req.query;
    const user = await getUser({ login });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.send({ user });
    } else {
        res.status(404).send({ message: "Пользователь не найден или не правильно введен пароль" });
    }
});

// router.delete("/:id", async (req, res) => {
//     const requestedId = req.body.id;
//     // const { accounts, categories, history } = await getFinanceData();
//     // res.send({ data: accounts, categories, history });
// });

module.exports = router;

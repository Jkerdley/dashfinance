const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const chalk = require("chalk");
const { registerNewUser, login } = require("../controllers/user");

const router = express.Router({ mergeParams: true });

router.post("/register", async (req, res) => {
    try {
        const { user, token } = await registerNewUser(req.body);
        res.cookie("token", token, { httpOnly: true }).send({ error: null, user });
    } catch (error) {
        res.send({ error: error.message || "Неизвестная ошибка" });
        console.log(error);
    }
});

router.post("/login", async (req, res) => {
    try {
        const { user, token } = await login(req.body.login, req.body.password);
        res.cookie("token", token, { httpOnly: true }).send({ error: null, user });
    } catch (error) {
        res.send({ error: error.message || "Неизвестная ошибка" });
        console.log(error);
    }
});

router.post("/logout", async (req, res) => {
    res.cookie("token", "", { httpOnly: true }).send({});
});

module.exports = router;

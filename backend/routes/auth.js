const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const chalk = require("chalk");
const { registerNewUser } = require("../controllers/user");

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

module.exports = router;

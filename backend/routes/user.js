const User = require("../models/User");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router({ mergeParams: true });
const authentificated = require("../middleware/authentificated");
router.patch("/user/:id", authentificated, async (req, res) => {
    try {
        const { name } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name: req.body.userName },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send({ error: "Пользователь не найден" });
        }

        res.send({ user: updatedUser });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;

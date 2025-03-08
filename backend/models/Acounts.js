const mongoose = require("mongoose");
const validator = require("validator");

const AccountsSchema = mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        balance: {
            type: Number,
            required: true,
            validate: {
                validator: Number.isFinite,
                message: "Баланс должен быть числом",
            },
        },
        icon: { type: String, required: true },
        type: { type: String, required: true },
        userId: { type: String, required: true },
    },
    { timestamps: true }
);

const Accounts = mongoose.model("Accounts", AccountsSchema, "accounts");

module.exports = Accounts;

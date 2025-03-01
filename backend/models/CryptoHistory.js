const mongoose = require("mongoose");
const validator = require("validator");

const CryptoHistorySchema = mongoose.Schema(
    {
        tag: { type: String },
        asset: { type: String },
        assetId: { type: String, required: true },
        assetAmount: {
            type: Number,
            required: true,
            validate: {
                validator: validator.isNumeric,
                message: "Сумма или количество должны быть числом",
            },
        },
        type: { type: String, required: true },
        check: { type: String, required: true },
        amount: {
            type: Number,
            required: true,
            validate: {
                validator: validator.isNumeric,
                message: "Сумма или количество должны быть числом",
            },
        },
        price: {
            type: Number,
            required: true,
            validate: {
                validator: validator.isNumeric,
                message: "Сумма или количество должны быть числом",
            },
        },
        date: { type: String, required: true },
    },
    { timestamps: true }
);

const CryptoHistory = mongoose.model("CryptoHistory", CryptoHistorySchema, "cryptohistory");

module.exports = CryptoHistory;

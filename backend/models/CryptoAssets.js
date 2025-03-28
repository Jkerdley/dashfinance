const mongoose = require("mongoose");
const validator = require("validator");

const CryptoAssetsSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        coinId: { type: String, required: true },
        symbol: { type: String, required: true },
        averagePrice: {
            type: Number,
            required: true,
            validate: {
                validator: Number.isFinite,
                message: "Цена должна быть числом",
            },
        },
        totalSumm: {
            type: Number,
            required: true,
            validate: {
                validator: Number.isFinite,
                message: "Итоговая сумма должна быть числом",
            },
        },
        assetAmount: {
            type: Number,
            required: true,
            validate: {
                validator: Number.isFinite,
                message: "Количество активов должно быть числом",
            },
        },
        history: { type: Array, required: true },
        userId: { type: String, required: true },
    },
    { timestamps: true }
);

const CryptoAssets = mongoose.model("CryptoAssets", CryptoAssetsSchema, "cryptoassets");

module.exports = CryptoAssets;

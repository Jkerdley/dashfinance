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
                validator: validator.isNumeric,
                message: "Цена должна быть числом",
            },
        },
        assetAmount: {
            type: Number,
            required: true,
            validate: {
                validator: validator.isNumeric,
                message: "Количество активов должно быть числом",
            },
        },
        name: { type: String, required: true },
        history: { type: Array, required: true },
    },
    { timestamps: true }
);

const CryptoAssets = mongoose.model("CryptoAssets", CryptoAssetsSchema, "cryptoassets");

module.exports = CryptoAssets;

const mongoose = require("mongoose");
const validator = require("validator");

const HistorySchema = mongoose.Schema(
    {
        tag: { type: String },
        category: { type: String },
        categoryId: { type: String, required: true },
        accountId: { type: String, required: true },
        icon: { type: String, required: true },
        type: { type: String, required: true },
        amount: {
            type: Number,
            required: true,
            validate: {
                validator: validator.isNumeric,
                message: "Сумма или количество должны быть числом",
            },
        },
        date: { type: String, required: true },
        comment: { type: String },
        account: { type: String },
        userId: { type: String, required: true },
    },
    { timestamps: true }
);

const History = mongoose.model("History", HistorySchema, "history");

module.exports = History;

const mongoose = require("mongoose");
const validator = require("validator");

const CategoriesSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        balance: {
            type: Number,
            required: true,
            validate: {
                validator: Number.isFinite,
                message: "Баланс должен быть числом",
            },
        },
        budget: {
            type: Number,
            validate: {
                validator: Number.isFinite,
                message: "Бюджет должен быть числом",
            },
        },
        icon: { type: String, required: true },
        userId: { type: String, required: true },
    },
    { timestamps: true }
);

const Categories = mongoose.model("Categories", CategoriesSchema, "categories");

module.exports = Categories;

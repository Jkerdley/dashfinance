const mongoose = require("mongoose");
const validator = require("validator");
// Подключение к вашей базе данных
mongoose
    .connect(process.env.MONGODB_CONNECTION_API, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Подключение к базе данных успешно");
        addUserIdToCollections("67c99bfb076dd76a23c24a66");
    })
    .catch((err) => {
        console.error("Ошибка подключения к базе данных", err);
    });

// Определите ваши модели (если они еще не определены)
const Collection1 = mongoose.model(
    "accounts",
    new mongoose.Schema(
        {
            name: { type: String, required: true },
            userId: { type: String, required: true },
            balance: {
                type: Number,
                required: true,
                validate: {
                    validator: validator.isNumeric,
                    message: "Баланс должен быть числом",
                },
            },
            icon: { type: String, required: true },
            type: { type: String, required: true },
        },
        { timestamps: true }
    )
);
const Collection2 = mongoose.model(
    "categories",
    new mongoose.Schema(
        {
            name: { type: String, required: true },
            userId: { type: String, required: true },
            balance: {
                type: Number,
                required: true,
                validate: {
                    validator: validator.isNumeric,
                    message: "Баланс должен быть числом",
                },
            },
            budget: {
                type: Number,
                validate: {
                    validator: validator.isNumeric,
                    message: "Бюджет должен быть числом",
                },
            },
            icon: { type: String, required: true },
        },
        { timestamps: true }
    )
);
const Collection3 = mongoose.model(
    "cryptoassets",
    new mongoose.Schema(
        {
            name: { type: String, required: true },
            userId: { type: String, required: true },
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
            history: { type: Array, required: true },
        },
        { timestamps: true }
    )
);
const Collection4 = mongoose.model(
    "history",
    new mongoose.Schema(
        {
            tag: { type: String },
            userId: { type: String, required: true },
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
        },
        { timestamps: true }
    )
);

// Функция для добавления поля userId
const addUserIdToCollections = async (userId) => {
    try {
        await Collection1.updateMany({}, { $set: { userId: userId } });
        await Collection2.updateMany({}, { $set: { userId: userId } });
        await Collection3.updateMany({}, { $set: { userId: userId } });
        await Collection4.updateMany({}, { $set: { userId: userId } });

        console.log("Поле userId добавлено во все коллекции");
    } catch (error) {
        console.error("Ошибка при добавлении поля userId", error);
    } finally {
        mongoose.connection.close(); // Закрыть соединение
    }
};

// Вызов функции с нужным userId

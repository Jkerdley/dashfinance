const mongoose = require("mongoose");
const validator = require("validator");
mongoose
    .connect(process.env.MONGODB_CONNECTION_API, {})
    .then(() => {
        console.log("Подключение к базе данных успешно");
        addUserIdToCollections("67c99bfb076dd76a23c24a66");
    })
    .catch((err) => {
        console.error("Ошибка подключения к базе данных", err);
    });

// const Collection1 = mongoose.model(
//     "accounts",
//     new mongoose.Schema(
//         {
//             name: { type: String, required: true },
//             userId: { type: String, required: true },
//             balance: {
//                 type: Number,
//                 required: true,
//                 validate: {
//                     validator: validator.isNumeric,
//                     message: "Баланс должен быть числом",
//                 },
//             },
//             icon: { type: String, required: true },
//             type: { type: String, required: true },
//         },
//         { timestamps: true }
//     )
// );
// const Collection2 = mongoose.model(
//     "categories",
//     new mongoose.Schema(
//         {
//             name: { type: String, required: true },
//             userId: { type: String, required: true },
//             balance: {
//                 type: Number,
//                 required: true,
//                 validate: {
//                     validator: validator.isNumeric,
//                     message: "Баланс должен быть числом",
//                 },
//             },
//             budget: {
//                 type: Number,
//                 validate: {
//                     validator: validator.isNumeric,
//                     message: "Бюджет должен быть числом",
//                 },
//             },
//             icon: { type: String, required: true },
//         },
//         { timestamps: true }
//     )
// );
// const Collection3 = mongoose.model(
//     "cryptoassets",
//     new mongoose.Schema(
//         {
//             name: { type: String, required: true },
//             userId: { type: String, required: true },
//             coinId: { type: String, required: true },
//             symbol: { type: String, required: true },
//             averagePrice: {
//                 type: Number,
//                 required: true,
//                 validate: {
//                     validator: validator.isNumeric,
//                     message: "Цена должна быть числом",
//                 },
//             },
//             assetAmount: {
//                 type: Number,
//                 required: true,
//                 validate: {
//                     validator: validator.isNumeric,
//                     message: "Количество активов должно быть числом",
//                 },
//             },
//             history: { type: Array, required: true },
//         },
//         { timestamps: true }
//     )
// );
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

const Collection4 = mongoose.model("History", HistorySchema, "history");

const addUserIdToCollections = async (userId) => {
    try {
        const result = await Collection4.updateMany({}, { $set: { userId: userId } });
        console.log(`Поле userId добавлено во все коллекции. Обновлено документов: ${result.modifiedCount}`);
    } catch (error) {
        console.error("Ошибка при добавлении поля userId", error);
    } finally {
        mongoose.connection.close();
    }
};

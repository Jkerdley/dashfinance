const History = require("../models/History");
const Accounts = require("../models/Acounts");
const Categories = require("../models/Categories");
const CryptoAssets = require("../models/CryptoAssets");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");

async function getHistory(userId) {
    const history = await History.find({ userId });
    return history;
}
async function getAccounts(userId) {
    const accounts = await Accounts.find({ userId });
    return accounts;
}
async function getCryptoAssets(userId) {
    const cryptoAssets = await CryptoAssets.find({ userId });
    return cryptoAssets;
}
async function getCategories(userId) {
    const categories = await Categories.find({ userId });
    return categories;
}

async function addAccount(data, userId) {
    const existedAccount = await Accounts.findOne({
        name: data.name,
        userId,
    });

    if (existedAccount) {
        throw new Error("Счет с таким именем уже существует");
    }

    return await Accounts.create({ ...data, userId });
}

async function addHistoryItem(data, userId) {
    const session = await mongoose.startSession();
    session.startTransaction();

    console.log("Данные операции:", data);
    console.log("userId:", userId);

    try {
        const historyItem = await History.create([{ ...data, userId }], { session });

        const account = await Accounts.findByIdAndUpdate(
            {
                _id: data.accountId,
                userId,
            },
            { $inc: { balance: -data.amount } },
            { new: true, session }
        );
        console.log("Обновленный счет:", account);

        if (!account) throw new Error("Счет не найден");
        if (account.balance < 0) throw new Error("Недостаточно средств на балансе");

        const category = await Categories.findByIdAndUpdate(
            {
                _id: data.categoryId,
                userId,
            },
            {
                $inc: { balance: data.amount },
            },
            { new: true, session }
        );

        if (!category) throw new Error("Категория расходов не найдена в базе данных");

        await session.commitTransaction();
        return historyItem[0];
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

async function getHistoryItem(id) {
    return History.findById({ _id: id });
}
async function getCategoryItem(id) {
    return Categories.findById({ _id: id });
}
async function getAccountItem(id) {
    return Accounts.findById({ _id: id });
}

module.exports = {
    getHistory,
    getAccounts,
    getCategories,
    getHistoryItem,
    getCategoryItem,
    getAccountItem,
    getCryptoAssets,
    addHistoryItem,
    addAccount,
};

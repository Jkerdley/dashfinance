const History = require("../models/History");
const Accounts = require("../models/Acounts");
const Categories = require("../models/Categories");
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

async function getCategories(userId) {
    const categories = await Categories.find({ userId });
    return categories;
}

async function addCategory(data, userId) {
    return await Categories.create({ ...data, userId });
}

async function addAccount(data, userId) {
    return await Accounts.create({ ...data, userId });
}

async function addHistoryItem(data, userId) {
    const session = await mongoose.startSession();
    session.startTransaction();

    if (data.type === "spend") {
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
    } else if (data.type === "add") {
        try {
            const historyItem = await History.create([{ ...data, userId }], { session });

            const account = await Accounts.findByIdAndUpdate(
                {
                    _id: data.accountId,
                    userId,
                },
                { $inc: { balance: data.amount } },
                { new: true, session }
            );
            console.log("Обновленный счет:", account);

            if (!account) throw new Error("Счет не найден");

            await session.commitTransaction();
            return historyItem[0];
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }
}

module.exports = {
    getHistory,
    getAccounts,
    getCategories,
    addHistoryItem,
    addAccount,
    addCategory,
};

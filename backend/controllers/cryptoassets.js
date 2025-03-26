const { default: mongoose } = require("mongoose");
const CryptoAssets = require("../models/CryptoAssets");

async function getCryptoAssets(userId) {
    const cryptoAssets = await CryptoAssets.find({ userId });
    return cryptoAssets;
}

async function deleteCryptoAssetHistoryItem(userId, assetId, historyItemId) {
    console.log("userId, assetId, historyItemId", userId, assetId, historyItemId);
    const session = await mongoose.startSession();

    try {
        const oldAsset = await CryptoAssets.findOneAndUpdate(
            {
                userId: userId,
                coinId: assetId,
            },
            {
                $pull: {
                    history: { _id: historyItemId },
                },
            }
        );
        if (!oldAsset) {
            throw new Error("Ошибка: Актив не найден");
        }
        const deletedHistoryItemId = oldAsset.history.find((item) => item._id === historyItemId);
        console.log("deletedHistoryItemId", deletedHistoryItemId);
        session.startTransaction();
        const result = await CryptoAssets.findOneAndUpdate(
            {
                _id: oldAsset._id,
                userId,
            },
            {
                $inc: { assetAmount: -deletedHistoryItemId.assetAmount },
            }
        );
        console.log("result", result);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
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
    getCryptoAssets,
    deleteCryptoAssetHistoryItem,
};

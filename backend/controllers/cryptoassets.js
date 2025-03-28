const { default: mongoose } = require("mongoose");
const CryptoAssets = require("../models/CryptoAssets");

async function getCryptoAssets(userId) {
    const cryptoAssets = await CryptoAssets.find({ userId });
    return cryptoAssets;
}

async function deleteCryptoAssetHistoryItem(userId, assetId, historyItemId) {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const asset = await CryptoAssets.findOneAndUpdate(
            {
                userId: userId,
                coinId: assetId,
            },

            {
                $pull: {
                    history: {
                        _id: historyItemId,
                    },
                },
            },
            {
                new: false,
                session,
            }
        );

        if (!asset) {
            throw new Error("Актив не найден");
        }

        const deletedItem = asset.history.find((item) => item._id.equals(historyItemId));

        if (!deletedItem) {
            throw new Error("Элемент истории не найден");
        }

        const updatedAmount = asset.assetAmount - deletedItem.assetAmount;
        const updatedSumm = asset.totalSumm - deletedItem.checkSumm;
        const newAverage = updatedAmount > 0 ? updatedSumm / updatedAmount : 0;

        const updatedAsset = await CryptoAssets.findByIdAndUpdate(
            asset._id,
            {
                $set: {
                    assetAmount: updatedAmount,
                    totalSumm: updatedSumm,
                    averagePrice: newAverage,
                },
            },

            {
                new: true,
                session,
            }
        );

        await session.commitTransaction();

        return updatedAsset;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

module.exports = {
    getCryptoAssets,
    deleteCryptoAssetHistoryItem,
};

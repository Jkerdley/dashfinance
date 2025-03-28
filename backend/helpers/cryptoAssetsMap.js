module.exports = function (cryptoAssets) {
    return {
        id: cryptoAssets._id,
        name: cryptoAssets.name,
        coinId: cryptoAssets.coinId,
        symbol: cryptoAssets.symbol,
        averagePrice: cryptoAssets.averagePrice,
        assetAmount: cryptoAssets.assetAmount,
        history: cryptoAssets.history,
        userId: cryptoAssets.userId,
        totalSumm: cryptoAssets.totalSumm,
    };
};

module.exports = function (cryptoHistory) {
    return {
        id: cryptoHistory._id,
        tag: cryptoHistory.tag,
        asset: cryptoHistory.asset,
        assetId: cryptoHistory.assetId,
        assetAmount: cryptoHistory.assetAmount,
        type: cryptoHistory.type,
        exchangedAsset: cryptoHistory.check,
        checkSumm: cryptoHistory.amount,
        checkPrice: cryptoHistory.price,
        date: cryptoHistory.date,
    };
};

const { default: mongoose } = require("mongoose");
const CryptoAssets = require("../models/CryptoAssets");
async function getCryptoAssets(userId) {
    const cryptoAssets = await CryptoAssets.find({ userId });
    return cryptoAssets;
}
module.exports = {
    getCryptoAssets,
};

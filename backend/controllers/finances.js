const History = require("../models/History");
const Accounts = require("../models/Acounts");
const Categories = require("../models/Categories");
const CryptoAssets = require("../models/CryptoAssets");
const User = require("../models/User");

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

async function getHistoryItem(id) {
    return History.findById({ _id: id });
}
async function getCategoryItem(id) {
    return Categories.findById({ _id: id });
}
async function getAccountItem(id) {
    return Accounts.findById({ _id: id });
}

async function deleteAccountItem(id) {
    Accounts.findByIdAndDelete(id);
    return console.log(`Счет номер ${id} был удален`);
}

module.exports = {
    getHistory,
    getAccounts,
    getCategories,
    getHistoryItem,
    getCategoryItem,
    getAccountItem,
    deleteAccountItem,
    getCryptoAssets,
};

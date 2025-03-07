const History = require("../models/History");
const Accounts = require("../models/Acounts");
const Categories = require("../models/Categories");
const CryptoAssets = require("../models/CryptoAssets");
const User = require("../models/User");

async function getHistory() {
    const history = await History.find();
    return history;
}
async function getAccounts() {
    const accounts = await Accounts.find();
    return accounts;
}
async function getCryptoAssets() {
    const cryptoAssets = await CryptoAssets.find();
    return cryptoAssets;
}
async function getCategories() {
    const categories = await Categories.find();
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

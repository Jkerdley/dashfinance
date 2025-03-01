const History = require("../models/History");
const CryptoHistory = require("../models/CryptoHistory");
const Accounts = require("../models/Acounts");
const Categories = require("../models/Categories");

async function getFinanceData() {
    const accounts = await Accounts.find();
    const categories = await Categories.find();
    const history = await History.find();
    const cryptohistory = await CryptoHistory.find();
    return { accounts, categories, history, cryptohistory };
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

module.exports = { getFinanceData, getHistoryItem, getCategoryItem, getAccountItem, deleteAccountItem };

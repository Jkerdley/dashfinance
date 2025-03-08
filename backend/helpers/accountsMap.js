module.exports = function (account) {
    return {
        id: account._id,
        name: account.name,
        balance: account.balance,
        icon: account.icon,
        type: account.type,
        userId: account.userId,
    };
};

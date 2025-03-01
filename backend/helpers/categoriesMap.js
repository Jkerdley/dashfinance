module.exports = function (item) {
    return {
        id: item._id,
        name: item.name,
        budget: item.budget,
        balance: item.balance,
        icon: item.icon,
    };
};

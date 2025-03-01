module.exports = function (item) {
    return {
        id: item._id,
        name: item.name,
        balance: item.balance,
        icon: item.icon,
        type: item.type,
    };
};

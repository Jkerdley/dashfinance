module.exports = function (category) {
    return {
        id: category._id,
        name: category.name,
        budget: category.budget,
        balance: category.balance,
        icon: category.icon,
        userId: category.userId,
    };
};

module.exports = function (history) {
    return {
        id: history._id,
        tag: history.tag,
        category: history.category,
        categoryId: history.categoryId,
        accountId: history.categoryId,
        icon: history.icon,
        type: history.type,
        amount: history.amount,
        date: history.date,
        comment: history.comment,
        account: history.account,
        userId: history.userId,
    };
};

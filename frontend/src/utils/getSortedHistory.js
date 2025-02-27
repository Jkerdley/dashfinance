export const getsortedHistory = (filteredHistory, sortType) => {
	switch (sortType) {
		case 'newest':
			return [...filteredHistory].sort((a, b) => {
				return new Date(b.date.split('.').reverse()) - new Date(a.date.split('.').reverse());
			});

		case 'oldest':
			return [...filteredHistory].sort((a, b) => {
				return new Date(a.date.split('.').reverse()) - new Date(b.date.split('.').reverse());
			});
		case 'alphabet':
			return [...filteredHistory].sort((a, b) =>
				a.asset ? a.asset.localeCompare(b.asset) : a.category.localeCompare(b.category),
			);
		case 'amountUp':
			return [...filteredHistory].sort(
				(a, b) => Number(a.amount.slice(1).trim()) - Number(b.amount.slice(1).trim()),
			);
		case 'amountDown':
			return [...filteredHistory].sort(
				(a, b) => Number(b.amount.slice(1).trim()) - Number(a.amount.slice(1).trim()),
			);
		default:
			return filteredHistory;
	}
};

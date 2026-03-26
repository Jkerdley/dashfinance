import { SORT_TYPES } from '../constants/operations';

export const getsortedHistory = (filteredHistory, sortType) => {
	switch (sortType) {
		case SORT_TYPES.NEWEST:
			return [...filteredHistory].sort((a, b) => {
				return new Date(b.date.split('.').reverse()) - new Date(a.date.split('.').reverse());
			});

		case SORT_TYPES.OLDEST:
			return [...filteredHistory].sort((a, b) => {
				return new Date(a.date.split('.').reverse()) - new Date(b.date.split('.').reverse());
			});
		case SORT_TYPES.ALPHABET:
			return [...filteredHistory].sort((a, b) =>
				a.asset ? a.asset.localeCompare(b.asset) : a.category.localeCompare(b.category),
			);
		case SORT_TYPES.HIGHEST_AMOUNT:
			return [...filteredHistory].sort(
				(a, b) => Number(a.amount.slice(1).trim()) - Number(b.amount.slice(1).trim()),
			);
		case SORT_TYPES.LOWEST_AMOUNT:
			return [...filteredHistory].sort(
				(a, b) => Number(b.amount.slice(1).trim()) - Number(a.amount.slice(1).trim()),
			);
		default:
			return filteredHistory;
	}
};

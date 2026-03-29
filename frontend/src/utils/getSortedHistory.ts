import { SORT_TYPES } from '../constants/operations';

interface SortableOperation {
	date: string;
	amount: string | number;
	asset?: string;
	category?: string;
	[key: string]: any;
}

const parseAmount = (val: string | number): number => {
	if (typeof val === 'number') return val;
	if (!val) return 0;
	return Number(val.replace(/[^\d.-]/g, ''));
};

export const getsortedHistory = <T extends SortableOperation>(
	filteredHistory: T[],
	sortType: string,
): T[] => {
	switch (sortType) {
		case SORT_TYPES.NEWEST:
			return [...filteredHistory].sort((a, b) => {
				return (
					new Date(b.date.split('.').reverse().join('-')).getTime() -
					new Date(a.date.split('.').reverse().join('-')).getTime()
				);
			});

		case SORT_TYPES.OLDEST:
			return [...filteredHistory].sort((a, b) => {
				return (
					new Date(a.date.split('.').reverse().join('-')).getTime() -
					new Date(b.date.split('.').reverse().join('-')).getTime()
				);
			});

		case SORT_TYPES.ALPHABET:
			return [...filteredHistory].sort((a, b) => {
				const nameA = a.asset || a.category || '';
				const nameB = b.asset || b.category || '';
				return nameA.localeCompare(nameB);
			});

		case SORT_TYPES.HIGHEST_AMOUNT:
			return [...filteredHistory].sort((a, b) => parseAmount(a.amount) - parseAmount(b.amount));

		case SORT_TYPES.LOWEST_AMOUNT:
			return [...filteredHistory].sort((a, b) => parseAmount(b.amount) - parseAmount(a.amount));

		default:
			return filteredHistory;
	}
};

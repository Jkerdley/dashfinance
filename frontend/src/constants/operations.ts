export const OPERATION_TYPES = {
	INCOME: 'add',
	EXPENSE: 'spend',
};

export const SORT_TYPES = {
	NEWEST: 'newest',
	OLDEST: 'oldest',
	HIGHEST_AMOUNT: 'amountUp',
	LOWEST_AMOUNT: 'amountDown',
	ALPHABET: 'alphabet',
	MONTH: 'month',
	THIS_YEAR: 'thisYear',
	ALL_TIME: 'allTime',
} as const;

export type SortTypesValue = (typeof SORT_TYPES)[keyof typeof SORT_TYPES];

export const VIRTUAL_LIST_CONFIG = {
	ROW_HEIGHT: 64,
	LIST_HEIGHT: 580,
};

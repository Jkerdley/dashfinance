export const ACCOUNT_TYPES = [
	{
		label: 'Дебетовый',
		value: 'debit',
		icon: 'debit',
	},
	{
		label: 'Кредитный',
		value: 'credit',
		icon: 'credit',
	},
	{
		label: 'Инвестиционный',
		value: 'gift',
		icon: 'gift',
	},
	{
		label: 'Наличные',
		value: 'cash',
		icon: 'cash',
	},
] as const;

export type AccountTypeValue = (typeof ACCOUNT_TYPES)[number]['value'];

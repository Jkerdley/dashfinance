export const API_CONFIG = {
	BASE_URL: import.meta.env.VITE_API_URL,
} as const;

export const API_TAGS = {
	USER: 'User',
	ACCOUNTS: 'Accounts',
	CATEGORIES: 'Categories',
	HISTORY: 'History',
	CRYPTO_ASSETS: 'CryptoAssets',
} as const;

export type ApiTag = (typeof API_TAGS)[keyof typeof API_TAGS];

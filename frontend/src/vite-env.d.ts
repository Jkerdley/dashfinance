/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_URL: string;
	readonly VITE_COINSSTAT_URL_API: string;
	readonly VITE_BANK_URL_API: string;
	readonly VITE_COINS_API: string;
	readonly VITE_CRYPTORANK_COINS_API: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

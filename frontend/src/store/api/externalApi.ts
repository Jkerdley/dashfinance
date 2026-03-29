import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 1. Расширили интерфейс всеми нужными полями из реального ответа API
export interface ExternalCryptoCoin {
	id: string;
	symbol: string;
	name: string;
	icon: string;
	price: number;
	priceChange1h: number;
	priceChange1d: number;
	priceChange1w: number;
	[key: string]: any; // Позволяет TS не ругаться на остальные поля (marketCap, volume и т.д.)
}

export interface CurrencyRatesResponse {
	cbrf: {
		data: Array<Array<number | string>>;
	};
	[key: string]: any;
}

export const externalApi = createApi({
	reducerPath: 'externalApi',
	baseQuery: fetchBaseQuery({ baseUrl: '' }),
	endpoints: (builder) => ({
		getCryptoCoins: builder.query<ExternalCryptoCoin[], void>({
			query: () => ({
				url: import.meta.env.VITE_COINSSTAT_URL_API,
				headers: {
					accept: 'application/json',
					'X-API-KEY': import.meta.env.VITE_COINS_API,
				},
			}),
			transformResponse: (response: any) => {
				const data = response?.result || response;

				if (Array.isArray(data) && Array.isArray(data[0])) {
					return data.flat();
				}

				return Array.isArray(data) ? data : [];
			},
		}),

		getCurrencyRates: builder.query<CurrencyRatesResponse, void>({
			query: () => import.meta.env.VITE_BANK_URL_API,
		}),
	}),
});

export const { useGetCryptoCoinsQuery, useGetCurrencyRatesQuery } = externalApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const externalApi = createApi({
	reducerPath: 'externalApi',
	baseQuery: fetchBaseQuery({ baseUrl: '' }),
	endpoints: (builder) => ({
		getCryptoCoins: builder.query({
			query: () => ({
				url: import.meta.env.VITE_COINSSTAT_URL_API,
				headers: {
					accept: 'application/json',
					'X-API-KEY': import.meta.env.VITE_COINS_API,
				},
			}),
			transformResponse: (response) => response.result || response,
		}),
		getCurrencyRates: builder.query({
			query: () => import.meta.env.VITE_BANK_URL_API,
		}),
	}),
});

export const { useGetCryptoCoinsQuery, useGetCurrencyRatesQuery } = externalApi;

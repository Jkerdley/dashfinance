import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_CONFIG, API_TAGS } from '../../constants/api';

export const backendApi = createApi({
	reducerPath: 'backendApi',
	baseQuery: fetchBaseQuery({
		baseUrl: API_CONFIG.BASE_URL,
		prepareHeaders: (headers) => {
			headers.set('Content-Type', 'application/json');
			return headers;
		},
		credentials: 'include',
	}),
	tagTypes: [
		API_TAGS.ACCOUNTS,
		API_TAGS.CATEGORIES,
		API_TAGS.HISTORY,
		API_TAGS.USER,
		API_TAGS.CRYPTO_ASSETS,
	],
	endpoints: (builder) => ({
		getUser: builder.query({
			query: () => '/auth/user',
			providesTags: [API_TAGS.USER],
		}),
		login: builder.mutation({
			query: (credentials) => ({
				url: '/auth/login',
				method: 'POST',
				body: credentials,
			}),
			invalidatesTags: [API_TAGS.USER],
		}),
		register: builder.mutation({
			query: (userData) => ({
				url: '/auth/register',
				method: 'POST',
				body: userData,
			}),
			invalidatesTags: [API_TAGS.USER],
		}),
		logout: builder.mutation({
			query: () => ({
				url: '/auth/logout',
				method: 'POST',
			}),
			invalidatesTags: [API_TAGS.USER],
		}),

		getAccounts: builder.query({
			query: () => '/accounts',
			providesTags: [API_TAGS.ACCOUNTS],
			transformResponse: (response) => response.accounts || response,
		}),
		addAccount: builder.mutation({
			query: (account) => ({
				url: '/accounts',
				method: 'POST',
				body: account,
			}),
			invalidatesTags: [API_TAGS.ACCOUNTS],
		}),
		updateAccount: builder.mutation({
			query: ({ id, ...account }) => ({
				url: `/accounts/${id}`,
				method: 'PUT',
				body: account,
			}),
			invalidatesTags: [API_TAGS.ACCOUNTS],
		}),
		deleteAccount: builder.mutation({
			query: (id) => ({
				url: `/accounts/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [API_TAGS.ACCOUNTS],
		}),

		getCategories: builder.query({
			query: () => '/categories',
			providesTags: [API_TAGS.CATEGORIES],
			transformResponse: (response) => response.categories || response,
		}),
		addCategory: builder.mutation({
			query: (category) => ({
				url: '/categories',
				method: 'POST',
				body: category,
			}),
			invalidatesTags: [API_TAGS.CATEGORIES],
		}),
		updateCategory: builder.mutation({
			query: ({ id, ...category }) => ({
				url: `/categories/${id}`,
				method: 'PUT',
				body: category,
			}),
			invalidatesTags: [API_TAGS.CATEGORIES],
		}),
		deleteCategory: builder.mutation({
			query: (id) => ({
				url: `/categories/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [API_TAGS.CATEGORIES],
		}),

		getHistory: builder.query({
			query: () => '/history',
			providesTags: [API_TAGS.HISTORY],
			transformResponse: (response) => response.history || response,
		}),
		addHistory: builder.mutation({
			query: (historyItem) => ({
				url: '/history',
				method: 'POST',
				body: historyItem,
			}),
			invalidatesTags: [API_TAGS.HISTORY, API_TAGS.ACCOUNTS],
		}),
		deleteHistory: builder.mutation({
			query: (id) => ({
				url: `/history/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [API_TAGS.HISTORY, API_TAGS.ACCOUNTS],
		}),

		getCryptoAssets: builder.query({
			query: () => '/cryptoassets',
			providesTags: [API_TAGS.CRYPTO_ASSETS],
			transformResponse: (response) => response.cryptoAssets || response,
		}),
		addCryptoAsset: builder.mutation({
			query: (asset) => ({
				url: '/cryptoassets',
				method: 'POST',
				body: asset,
			}),
			invalidatesTags: [API_TAGS.CRYPTO_ASSETS],
		}),
		updateCryptoAsset: builder.mutation({
			query: ({ id, ...asset }) => ({
				url: `/cryptoasset/${id}`,
				method: 'PATCH',
				body: asset,
			}),
			invalidatesTags: [API_TAGS.CRYPTO_ASSETS],
		}),
		deleteCryptoAsset: builder.mutation({
			query: ({ assetId, _id }) => ({
				url: `/cryptoassets/${assetId}`,
				method: 'DELETE',
				body: { _id },
			}),
			invalidatesTags: [API_TAGS.CRYPTO_ASSETS],
		}),

		updateUser: builder.mutation({
			query: ({ id, userName }) => ({
				url: `/user/${id}`,
				method: 'PATCH',
				body: { userName },
			}),
			invalidatesTags: [API_TAGS.USER],
		}),
	}),
});

export const {
	useGetUserQuery,
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
	useGetAccountsQuery,
	useAddAccountMutation,
	useUpdateAccountMutation,
	useDeleteAccountMutation,
	useGetCategoriesQuery,
	useAddCategoryMutation,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation,
	useGetHistoryQuery,
	useAddHistoryMutation,
	useDeleteHistoryMutation,
	useGetCryptoAssetsQuery,
	useAddCryptoAssetMutation,
	useUpdateCryptoAssetMutation,
	useDeleteCryptoAssetMutation,
	useUpdateUserMutation,
} = backendApi;

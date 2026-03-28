import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_CONFIG, API_TAGS } from '../../constants/api';
import type { User, Account, Category, HistoryOperation, CryptoAsset } from '../../types/models';

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
		// USER
		getUser: builder.query<{ user: User }, void>({
			query: () => '/auth/user',
			providesTags: [API_TAGS.USER],
		}),
		login: builder.mutation<{ user: User; token: string }, Record<string, any>>({
			query: (credentials) => ({
				url: '/auth/login',
				method: 'POST',
				body: credentials,
			}),
			invalidatesTags: [API_TAGS.USER],
		}),
		register: builder.mutation<{ user: User; token: string }, Record<string, any>>({
			query: (userData) => ({
				url: '/auth/register',
				method: 'POST',
				body: userData,
			}),
			invalidatesTags: [API_TAGS.USER],
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: '/auth/logout',
				method: 'POST',
			}),
			invalidatesTags: [API_TAGS.USER],
		}),
		updateUser: builder.mutation<User, { id: string; userName: string }>({
			query: ({ id, userName }) => ({
				url: `/user/${id}`,
				method: 'PATCH',
				body: { userName },
			}),
			invalidatesTags: [API_TAGS.USER],
		}),

		// ACCOUNTS
		getAccounts: builder.query<Account[], void>({
			query: () => '/accounts',
			providesTags: [API_TAGS.ACCOUNTS],
			transformResponse: (response: { accounts: Account[] } | Account[]) =>
				Array.isArray(response) ? response : response.accounts,
		}),
		addAccount: builder.mutation<Account, Omit<Account, 'id' | 'userId'>>({
			query: (account) => ({
				url: '/accounts',
				method: 'POST',
				body: account,
			}),
			invalidatesTags: [API_TAGS.ACCOUNTS],
		}),
		updateAccount: builder.mutation<Account, Partial<Account> & { id: string }>({
			query: ({ id, ...account }) => ({
				url: `/accounts/${id}`,
				method: 'PUT',
				body: account,
			}),
			invalidatesTags: [API_TAGS.ACCOUNTS],
		}),
		deleteAccount: builder.mutation<void, string>({
			query: (id) => ({
				url: `/accounts/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [API_TAGS.ACCOUNTS],
		}),

		// CATEGORIES
		getCategories: builder.query<Category[], void>({
			query: () => '/categories',
			providesTags: [API_TAGS.CATEGORIES],
			transformResponse: (response: { categories: Category[] } | Category[]) =>
				Array.isArray(response) ? response : response.categories,
		}),
		addCategory: builder.mutation<Category, Omit<Category, 'id' | 'userId'>>({
			query: (category) => ({
				url: '/categories',
				method: 'POST',
				body: category,
			}),
			invalidatesTags: [API_TAGS.CATEGORIES],
		}),
		updateCategory: builder.mutation<Category, Partial<Category> & { id: string }>({
			query: ({ id, ...category }) => ({
				url: `/categories/${id}`,
				method: 'PUT',
				body: category,
			}),
			invalidatesTags: [API_TAGS.CATEGORIES],
		}),
		deleteCategory: builder.mutation<void, string>({
			query: (id) => ({
				url: `/categories/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [API_TAGS.CATEGORIES],
		}),

		// HISTORY
		getHistory: builder.query<HistoryOperation[], void>({
			query: () => '/history',
			providesTags: [API_TAGS.HISTORY],
			transformResponse: (response: { history: HistoryOperation[] } | HistoryOperation[]) =>
				Array.isArray(response) ? response : response.history,
		}),
		addHistory: builder.mutation<HistoryOperation, Omit<HistoryOperation, 'id' | 'userId'>>({
			query: (historyItem) => ({
				url: '/history',
				method: 'POST',
				body: historyItem,
			}),
			invalidatesTags: [API_TAGS.HISTORY, API_TAGS.ACCOUNTS, API_TAGS.CATEGORIES],
		}),
		deleteHistory: builder.mutation<void, string>({
			query: (id) => ({
				url: `/history/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [API_TAGS.HISTORY, API_TAGS.ACCOUNTS, API_TAGS.CATEGORIES],
		}),

		// CRYPTO ASSETS
		getCryptoAssets: builder.query<CryptoAsset[], void>({
			query: () => '/cryptoassets',
			providesTags: [API_TAGS.CRYPTO_ASSETS],
			transformResponse: (response: { cryptoAssets: CryptoAsset[] } | CryptoAsset[]) =>
				Array.isArray(response) ? response : response.cryptoAssets,
		}),
		addCryptoAsset: builder.mutation<CryptoAsset, Omit<CryptoAsset, 'id' | 'userId'>>({
			query: (asset) => ({
				url: '/cryptoassets',
				method: 'POST',
				body: asset,
			}),
			invalidatesTags: [API_TAGS.CRYPTO_ASSETS],
		}),
		updateCryptoAsset: builder.mutation<CryptoAsset, Partial<CryptoAsset> & { id: string }>({
			query: ({ id, ...asset }) => ({
				url: `/cryptoasset/${id}`,
				method: 'PATCH',
				body: asset,
			}),
			invalidatesTags: [API_TAGS.CRYPTO_ASSETS],
		}),
		deleteCryptoAsset: builder.mutation<void, { assetId: string; _id: string }>({
			query: ({ assetId, _id }) => ({
				url: `/cryptoassets/${assetId}`,
				method: 'DELETE',
				body: { _id },
			}),
			invalidatesTags: [API_TAGS.CRYPTO_ASSETS],
		}),
		deleteEntireCryptoAsset: builder.mutation<void, string>({
			query: (id) => ({
				url: `/cryptoasset/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [API_TAGS.CRYPTO_ASSETS],
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
	useDeleteEntireCryptoAssetMutation,
	useUpdateUserMutation,
} = backendApi;

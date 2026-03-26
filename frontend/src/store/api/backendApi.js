import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const backendApi = createApi({
	reducerPath: 'backendApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3007/api',
		prepareHeaders: (headers) => {
			headers.set('Content-Type', 'application/json');
			return headers;
		},
		credentials: 'include',
	}),
	tagTypes: ['Accounts', 'Categories', 'History', 'User', 'CryptoAssets'],
	endpoints: (builder) => ({
		getUser: builder.query({
			query: () => '/auth/user',
			providesTags: ['User'],
		}),
		login: builder.mutation({
			query: (credentials) => ({
				url: '/auth/login',
				method: 'POST',
				body: credentials,
			}),
			invalidatesTags: ['User'],
		}),
		register: builder.mutation({
			query: (userData) => ({
				url: '/auth/register',
				method: 'POST',
				body: userData,
			}),
			invalidatesTags: ['User'],
		}),
		logout: builder.mutation({
			query: () => ({
				url: '/auth/logout',
				method: 'POST',
			}),
			invalidatesTags: ['User'],
		}),

		getAccounts: builder.query({
			query: () => '/accounts',
			providesTags: ['Accounts'],
			transformResponse: (response) => response.accounts || response,
		}),
		addAccount: builder.mutation({
			query: (account) => ({
				url: '/accounts',
				method: 'POST',
				body: account,
			}),
			invalidatesTags: ['Accounts'],
		}),
		updateAccount: builder.mutation({
			query: ({ id, ...account }) => ({
				url: `/accounts/${id}`,
				method: 'PUT',
				body: account,
			}),
			invalidatesTags: ['Accounts'],
		}),
		deleteAccount: builder.mutation({
			query: (id) => ({
				url: `/accounts/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Accounts'],
		}),

		getCategories: builder.query({
			query: () => '/categories',
			providesTags: ['Categories'],
			transformResponse: (response) => response.categories || response,
		}),
		addCategory: builder.mutation({
			query: (category) => ({
				url: '/categories',
				method: 'POST',
				body: category,
			}),
			invalidatesTags: ['Categories'],
		}),
		updateCategory: builder.mutation({
			query: ({ id, ...category }) => ({
				url: `/categories/${id}`,
				method: 'PUT',
				body: category,
			}),
			invalidatesTags: ['Categories'],
		}),
		deleteCategory: builder.mutation({
			query: (id) => ({
				url: `/categories/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Categories'],
		}),

		getHistory: builder.query({
			query: () => '/history',
			providesTags: ['History'],
			transformResponse: (response) => response.history || response,
		}),
		addHistory: builder.mutation({
			query: (historyItem) => ({
				url: '/history',
				method: 'POST',
				body: historyItem,
			}),
			invalidatesTags: ['History', 'Accounts'],
		}),
		deleteHistory: builder.mutation({
			query: (id) => ({
				url: `/history/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['History', 'Accounts'],
		}),

		getCryptoAssets: builder.query({
			query: () => '/cryptoassets',
			providesTags: ['CryptoAssets'],
			transformResponse: (response) => response.cryptoAssets || response,
		}),
		addCryptoAsset: builder.mutation({
			query: (asset) => ({
				url: '/cryptoassets',
				method: 'POST',
				body: asset,
			}),
			invalidatesTags: ['CryptoAssets'],
		}),
		updateCryptoAsset: builder.mutation({
			query: ({ id, ...asset }) => ({
				url: `/cryptoasset/${id}`,
				method: 'PATCH',
				body: asset,
			}),
			invalidatesTags: ['CryptoAssets'],
		}),
		deleteCryptoAsset: builder.mutation({
			query: ({ assetId, _id }) => ({
				url: `/cryptoassets/${assetId}`,
				method: 'DELETE',
				body: { _id },
			}),
			invalidatesTags: ['CryptoAssets'],
		}),

		updateUser: builder.mutation({
			query: ({ id, userName }) => ({
				url: `/user/${id}`,
				method: 'PATCH',
				body: { userName },
			}),
			invalidatesTags: ['User'],
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

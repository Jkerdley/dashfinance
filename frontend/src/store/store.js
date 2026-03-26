import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { themeReducer } from './slices/themeSlice';
import { currencyReducer } from './slices/currencySlice';
import { modalReducer } from './slices/modalSlice';
import { backendApi } from './api/backendApi';
import { externalApi } from './api/externalApi';

export const store = configureStore({
	reducer: {
		theme: themeReducer,
		currency: currencyReducer,
		modal: modalReducer,
		[backendApi.reducerPath]: backendApi.reducer,
		[externalApi.reducerPath]: externalApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(backendApi.middleware, externalApi.middleware),
});

setupListeners(store.dispatch);

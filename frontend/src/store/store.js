import { legacy_createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { currencyReducer } from './reducers/currencyReducer';
import { modalReducer } from './reducers/modalReducer';
import { historyReducer } from './reducers/historyReducer';
import { accountsReducer } from './reducers/accountsReducer';
import { categoriesReducer } from './reducers/categoriesReducer';
import { cryptoAssetsReducer } from './reducers/cryptoAssetsReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
	currency: currencyReducer,
	modal: modalReducer,
	history: historyReducer,
	accounts: accountsReducer,
	categories: categoriesReducer,
	cryptoAssets: cryptoAssetsReducer,
});

export const store = legacy_createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

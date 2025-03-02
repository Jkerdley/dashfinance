import { legacy_createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { currencyReducer } from './reducers/currencyReducer';
import { modalReducer } from './reducers/modalReducer';
import { historyReducer } from './reducers/historyReducer';
import { cryptoHistoryReducer } from './reducers/cryptoHistoryReducer';
import { accountsReducer } from './reducers/accountsReducer';
import { categoriesReducer } from './reducers/categoriesReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
	currency: currencyReducer,
	modal: modalReducer,
	history: historyReducer,
	cryptoHistory: cryptoHistoryReducer,
	accounts: accountsReducer,
	categories: categoriesReducer,
});

export const store = legacy_createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

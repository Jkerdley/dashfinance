import { legacy_createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { currencyReducer } from './reducers/currencyReducer';
import { modalReducer } from './reducers/modalReducer';
import { historyReducer } from './reducers/historyReducer';
import { accountsReducer } from './reducers/accountsReducer';
import { categoriesReducer } from './reducers/categoriesReducer';
import { cryptoReducer } from './reducers/cryptoReducer';
import { userReducer } from './reducers/userReducer';
import { themeReducer } from './reducers/themeReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
	currency: currencyReducer,
	modal: modalReducer,
	history: historyReducer,
	accounts: accountsReducer,
	categories: categoriesReducer,
	crypto: cryptoReducer,
	user: userReducer,
	theme: themeReducer,
});

export const store = legacy_createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

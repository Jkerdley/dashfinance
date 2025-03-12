import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './main.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { App } from './App.jsx';

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
);

import React from 'react';
import { accounts, categories, operations } from '../../../../db';

export const FinanceResult = (isUSD) => {
	const accountsDB = accounts;
	const operationsDB = operations
		.filter((item) => {
			return item.type === 'add';
		})
		.reduce((acc, item) => acc + Number(item.amount), 0);
	console.log('operationsDB', operationsDB);
	console.log('operationsDB', operations[6].type);

	const categoriesDB = categories.reduce((acc, item) => acc + item.balance, 0);

	const rubleCourse = 98.3;

	const summInMounth = (dataset) => {
		dataset.toFixed(2);
		return isUSD ? '$ ' + dataset.toFixed(2) : '\u20bd ' + (rubleCourse * dataset).toFixed(2);
	};

	return (
		<div className="bg-amber-400/10 h-full">
			<h1>Расходы за месяц: {summInMounth(categoriesDB)}</h1>
			<h1>Доходы за месяц: {summInMounth(operationsDB)}</h1>
		</div>
	);
};

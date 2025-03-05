import React from 'react';
import { FinanceAccount } from '../../../pages/FinancesPage/FinanceAccount/FinanceAccount';
import { Categorie } from '../../../pages/FinancesPage/Categories';

export const SelectedCategories = ({ operationAccount, operationCategorie, formState }) => {
	return (
		<section className="flex flex-wrap 2xl:flex-nowrap gap-4 items-center justify-between text-start">
			{operationAccount && (
				<FinanceAccount
					accountName={operationAccount.name}
					accountBalance={operationAccount.balance}
					icon={operationAccount.icon}
					noButton={true}
				/>
			)}
			<p>{'\u27A0'}</p>
			{operationCategorie && (
				<Categorie
					noButton={true}
					budget={operationCategorie.budget}
					balance={operationCategorie.balance}
					categorie={formState.selectedCategoryValue}
					icon={operationCategorie.icon}
				/>
			)}
		</section>
	);
};

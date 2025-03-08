import React from 'react';
import { FinanceAccount } from '../../../pages/FinancesPage/FinanceAccount/FinanceAccount';
import { Categorie } from '../../../pages/FinancesPage/Categories';

export const SelectedCategories = ({ formState }) => {
	return (
		<section className="flex flex-wrap 2xl:flex-nowrap gap-4 items-center justify-between text-start">
			{formState.selectedAccount && (
				<FinanceAccount
					accountName={formState.selectedAccount.name}
					accountBalance={formState.selectedAccount.balance}
					icon={formState.selectedAccount.icon}
					noButton={true}
				/>
			)}
			<p>{'\u27A0'}</p>
			{formState.selectedCategory && (
				<Categorie
					noButton={true}
					budget={formState.selectedCategory.budget}
					balance={formState.selectedCategory.balance}
					categorie={formState.selectedCategory.name}
					icon={formState.selectedCategory.icon}
				/>
			)}
		</section>
	);
};

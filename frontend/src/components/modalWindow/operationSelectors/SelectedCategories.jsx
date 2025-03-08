import React from 'react';
import { FinanceAccount } from '../../../pages/FinancesPage/FinanceAccount/FinanceAccount';
import { Categorie } from '../../../pages/FinancesPage/Categories';
import { useCurrency } from '../../../hooks';
import { calculateValueInCurrency } from '../../../utils';

export const SelectedCategories = ({ formState }) => {
	const { isUSD, rubleCourse } = useCurrency();
	return (
		<section className="flex flex-wrap 2xl:flex-nowrap gap-4 items-center justify-between text-start">
			{formState.selectedAccount && (
				<FinanceAccount
					accountName={formState.selectedAccount.name}
					accountBalance={calculateValueInCurrency(
						formState.selectedAccount.balance,
						isUSD,
						rubleCourse,
					)}
					icon={formState.selectedAccount.icon}
					noButton={true}
				/>
			)}
			<p>{'\u27A0'}</p>
			{formState.selectedCategory && (
				<Categorie
					noButton={true}
					budget={calculateValueInCurrency(formState.selectedCategory.budget, isUSD, rubleCourse)}
					balance={calculateValueInCurrency(formState.selectedCategory.balance, isUSD, rubleCourse)}
					categorie={formState.selectedCategory.name}
					icon={formState.selectedCategory.icon}
				/>
			)}
		</section>
	);
};

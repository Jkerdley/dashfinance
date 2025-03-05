import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CurrencyToggle } from '../../buttons';
import { useCurrency } from '../../../hooks';
import { calculateValueInCurrency, getIconOfCategorie } from '../../../utils';
import {
	FinalResultNewOperationItem,
	OperationSelectors,
	SaveAndCancelButtons,
	SelectedCategories,
} from '../operationComponents';
import { useSelector } from 'react-redux';
import { selectAccounts, selectCategories } from '../../../store/selectors';

export const OperationForm = ({ onClose, operationType }) => {
	const { isUSD, rubleCourse } = useCurrency();

	const accounts = useSelector(selectAccounts);
	const categories = useSelector(selectCategories);
	const accountsInCurrency = accounts.map((account) => ({
		...account,
		balance: calculateValueInCurrency(account.balance, isUSD, rubleCourse),
	}));

	const categoriesInCurrency = categories.map((categorie) => ({
		...categorie,
		balance: calculateValueInCurrency(categorie.balance, isUSD, rubleCourse),
		budget: calculateValueInCurrency(categorie.budget, isUSD, rubleCourse),
	}));

	const [formState, setFormState] = useState({
		operationDate: new Date().toISOString().split('T')[0],
		operationSumm: '',
		selectedAccountValue: '',
		selectedCategoryValue: '',
	});

	useEffect(() => {
		const shouldUpdateValues =
			accountsInCurrency.length > 0 &&
			categoriesInCurrency.length > 0 &&
			(!formState.selectedAccountValue || !formState.selectedCategoryValue);

		if (shouldUpdateValues) {
			setFormState((prev) => ({
				...prev,
				selectedAccountValue: accountsInCurrency[0].name,
				selectedCategoryValue: categoriesInCurrency[0].name,
			}));
		}
	}, [
		accountsInCurrency,
		categoriesInCurrency,
		formState.selectedAccountValue,
		formState.selectedCategoryValue,
	]);

	const handleInputChange = useCallback(
		(field) => (e) => {
			const value =
				field === 'operationSumm'
					? e.target.value === ''
						? ''
						: Number(e.target.value)
					: e.target.value;

			setFormState((prev) => ({
				...prev,
				[field]: value,
			}));
		},
		[],
	);

	const handleFormSubmit = useCallback(
		(event) => {
			event?.preventDefault();

			if (!formState.operationSumm) {
				alert('Введите сумму операции');
				return;
			}

			if (formState.operationSumm < 0) {
				alert('Сумма должна быть больше нуля');
				return;
			}

			const summInUSD = isUSD ? formState.operationSumm * rubleCourse : formState.operationSumm;

			console.log('Submit FORM DATA', {
				tag: 'finance',
				category: formState.selectedCategoryValue,
				categoryId: '0125',
				account: formState.selectedAccountValue,
				accountId: '0001',
				icon: 'products',
				type: operationType || 'add',
				summ: summInUSD,
				date: formState.operationDate,
				comment: '',
			});

			onClose();
		},
		[formState, isUSD, rubleCourse, operationType, onClose],
	);

	if (!accountsInCurrency.length || !categoriesInCurrency.length) {
		onClose();
		alert('Сначала необходимо добавить счета и категории расходов');
		return null;
	}

	const operationAccount =
		accountsInCurrency.find((item) => item.name === formState.selectedAccountValue) ||
		accountsInCurrency[0];
	const operationCategorie =
		categoriesInCurrency.find((item) => item.name === formState.selectedCategoryValue) ||
		categoriesInCurrency[0];

	return (
		<section id="selectors__header__and_buttons" className="flex flex-col justify-between h-full">
			<div className="flex flex-col gap-4 items-center justify-center">
				<h3>ДОБАВИТЬ ОПЕРАЦИЮ</h3>
				<CurrencyToggle />
			</div>

			<OperationSelectors
				formState={formState}
				accountsInCurrency={accountsInCurrency}
				categoriesInCurrency={categoriesInCurrency}
				handleInputChange={handleInputChange}
			/>

			<SelectedCategories
				operationAccount={operationAccount}
				operationCategorie={operationCategorie}
				formState={formState}
			/>

			<FinalResultNewOperationItem
				handleInputChange={handleInputChange}
				getIconOfCategorie={getIconOfCategorie}
				handleFormSubmit={handleFormSubmit}
				operationAccount={operationAccount}
				formState={formState}
				isUSD={isUSD}
			/>

			<SaveAndCancelButtons handleFormSubmit={handleFormSubmit} onClose={onClose} />
		</section>
	);
};

OperationForm.propTypes = {
	onClose: PropTypes.func.isRequired,
	operationType: PropTypes.oneOf(['income', 'expense']),
};

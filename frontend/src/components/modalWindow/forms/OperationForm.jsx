import React, { useState, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { CurrencyToggle } from '../../buttons';
import { useCurrency } from '../../../hooks';
import { calculateValueInCurrency, request } from '../../../utils';
import {
	FinalResultNewOperationItem,
	OperationSelectors,
	SaveAndCancelButtons,
	SelectedCategories,
} from '../operationSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccounts, selectCategories } from '../../../store/selectors';
import { fetchAccounts, fetchCategories } from '../../../store/actions/async';
import { fetchHistory } from '../../../store/actions';

export const OperationForm = ({ onClose, operationType }) => {
	const { isUSD, rubleCourse } = useCurrency();
	const dispatch = useDispatch();
	const accounts = useSelector(selectAccounts);
	const categories = useSelector(selectCategories);

	const accountsInCurrency = useMemo(
		() =>
			accounts.map((a) => ({
				...a,
				balance: calculateValueInCurrency(a.balance, isUSD, rubleCourse),
			})),
		[accounts, isUSD, rubleCourse],
	);

	const categoriesInCurrency = useMemo(
		() =>
			categories.map((c) => ({
				...c,
				balance: calculateValueInCurrency(c.balance, isUSD, rubleCourse),
				budget: calculateValueInCurrency(c.budget, isUSD, rubleCourse),
			})),
		[categories, isUSD, rubleCourse],
	);

	const [formState, setFormState] = useState({
		operationDate: new Date().toISOString().split('T')[0],
		operationSumm: '',
		selectedAccount: null,
		selectedCategory: null,
	});

	useEffect(() => {
		if (accountsInCurrency.length > 0 && categoriesInCurrency.length > 0) {
			const shouldUpdate =
				!formState.selectedAccount ||
				!formState.selectedCategory ||
				!accountsInCurrency.some((a) => a.id === formState.selectedAccount?.id) ||
				!categoriesInCurrency.some((c) => c.id === formState.selectedCategory?.id);

			if (shouldUpdate) {
				setFormState((prev) => ({
					...prev,
					selectedAccount: accountsInCurrency[0],
					selectedCategory: categoriesInCurrency[0],
				}));
			}
		}
	}, [accountsInCurrency, categoriesInCurrency]);

	const handleAccountChange = useCallback(
		(selectedId) => {
			const account = accountsInCurrency.find((a) => a.id.toString() === selectedId);
			setFormState((prev) => ({ ...prev, selectedAccount: account }));
		},
		[accountsInCurrency],
	);

	const handleCategoryChange = useCallback(
		(selectedId) => {
			const category = categoriesInCurrency.find((c) => c.id.toString() === selectedId);
			setFormState((prev) => ({ ...prev, selectedCategory: category }));
		},
		[categoriesInCurrency],
	);

	const handleSummChange = useCallback((e) => {
		const value = e.target.value;
		if (value === '' || !isNaN(value)) {
			setFormState((prev) => ({ ...prev, operationSumm: parseFloat(value) }));
		} else {
			alert('Пожалуйста, введите цифры');
		}
	}, []);

	const handleDateChange = useCallback((e) => {
		setFormState((prev) => ({ ...prev, operationDate: e.target.value }));
	}, []);

	const handleFormSubmit = useCallback(
		async (event) => {
			event?.preventDefault();
			try {
				if (!formState.selectedAccount || !formState.selectedCategory) {
					alert('Выберите счет и категорию');
					return;
				}

				if (!formState.operationSumm) {
					alert('Введите сумму операции');
					return;
				}

				if (formState.operationSumm < 0) {
					alert('Сумма должна быть больше нуля');
					return;
				}

				const amountToSend = Math.abs(
					isUSD ? formState.operationSumm * rubleCourse : formState.operationSumm,
				);

				const formDataToSend = {
					tag: 'finance',
					account: formState.selectedAccount.name,
					accountId: formState.selectedAccount.id,
					category: formState.selectedCategory.name,
					categoryId: formState.selectedCategory.id,
					icon: formState.selectedCategory.icon,
					amount: amountToSend,
					date: formState.operationDate,
					type: operationType || 'spend',
					comment: formState.comment || '',
				};

				const response = await request('/history', 'POST', formDataToSend);

				console.log('Submit FORM DATA response', response);

				dispatch(fetchAccounts());
				dispatch(fetchCategories());
				dispatch(fetchHistory());

				onClose();
			} catch (error) {
				alert(`Ошибка: ${error.message}`);
			}
		},
		[formState, isUSD, rubleCourse, operationType, onClose],
	);

	if (!accountsInCurrency.length || !categoriesInCurrency.length) {
		onClose();
		alert('Сначала необходимо добавить счета и категории расходов');
		return null;
	}

	const operationAccount =
		accountsInCurrency.find((item) => item.name === formState.selectedAccountName) ||
		accountsInCurrency[0];
	const operationCategorie =
		categoriesInCurrency.find((item) => item.name === formState.selectedCategoryName) ||
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
				onAccountChange={handleAccountChange}
				onCategoryChange={handleCategoryChange}
			/>

			<SelectedCategories formState={formState} />

			<FinalResultNewOperationItem
				handleSummChange={handleSummChange}
				handleDateChange={handleDateChange}
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
	operationType: PropTypes.oneOf(['add', 'spend']),
};

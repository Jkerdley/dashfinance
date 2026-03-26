import React, { useState, useCallback, useEffect } from 'react';
import { CurrencyToggle } from '../../buttons';
import { useCurrency } from '../../../hooks';
import {
	FinalResultNewOperationItem,
	OperationSelectors,
	SaveAndCancelButtons,
	SelectedCategories,
} from '../operationSelectors';
import { useGetAccountsQuery, useGetCategoriesQuery, useAddHistoryMutation } from '../../../store/api/backendApi';

export const SpendOperationForm = ({ onClose, operationType }) => {
	const { isUSD, rubleCourse } = useCurrency();
	const { data: accounts = [] } = useGetAccountsQuery();
	const { data: categories = [] } = useGetCategoriesQuery();
	const [addHistory] = useAddHistoryMutation();

	const [formState, setFormState] = useState({
		operationDate: new Date().toISOString().split('T')[0],
		operationSumm: '',
		selectedAccount: null,
		selectedCategory: null,
	});

	useEffect(() => {
		if (accounts.length > 0 && categories.length > 0) {
			const shouldUpdate =
				!formState.selectedAccount ||
				!formState.selectedCategory ||
				!accounts.some((a) => a.id === formState.selectedAccount?.id) ||
				!categories.some((c) => c.id === formState.selectedCategory?.id);

			if (shouldUpdate) {
				setFormState((prev) => ({
					...prev,
					selectedAccount: accounts[0],
					selectedCategory: categories[0],
				}));
			}
		}
	}, [accounts, categories]);

	const handleAccountChange = useCallback(
		(selectedId) => {
			const account = accounts.find((account) => account.id.toString() === selectedId);
			setFormState((prev) => ({ ...prev, selectedAccount: account }));
		},
		[accounts],
	);

	const handleCategoryChange = useCallback(
		(selectedId) => {
			const category = categories.find((category) => category.id.toString() === selectedId);
			setFormState((prev) => ({ ...prev, selectedCategory: category }));
		},
		[categories],
	);

	const handleSummChange = useCallback((event) => {
		const value = event.target.value;

		if (value === '' || !isNaN(value)) {
			setFormState((prev) => ({ ...prev, operationSumm: value }));
		} else {
			alert('Пожалуйста, введите цифры');
		}
	}, []);

	const handleDateChange = useCallback((event) => {
		setFormState((prev) => ({ ...prev, operationDate: event.target.value }));
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
					isUSD ? formState.operationSumm * rubleCourse : parseFloat(formState.operationSumm),
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

				await addHistory(formDataToSend).unwrap();
				onClose();
			} catch (error) {
				alert(`Ошибка: ${error.data?.error || error.message}`);
			}
		},
		[formState, isUSD, rubleCourse, operationType, onClose, addHistory],
	);

	if (!accounts.length || !categories.length) {
		onClose();
		alert('Сначала необходимо добавить счета и категории расходов');
		return null;
	}

	return (
		<section
			id="selectors__header__and_buttons"
			className="flex flex-col justify-between items-center gap-8  min-h-[45vh]"
		>
			<div className="flex flex-col gap-6 items-center justify-center">
				<h3>ДОБАВИТЬ ОПЕРАЦИЮ</h3>
				<CurrencyToggle />
			</div>

			<OperationSelectors
				formState={formState}
				accounts={accounts}
				categories={categories}
				onAccountChange={handleAccountChange}
				onCategoryChange={handleCategoryChange}
			/>

			<SelectedCategories formState={formState} />

			<FinalResultNewOperationItem
				handleSummChange={handleSummChange}
				handleDateChange={handleDateChange}
				handleFormSubmit={handleFormSubmit}
				formState={formState}
				isUSD={isUSD}
			/>

			<SaveAndCancelButtons handleFormSubmit={handleFormSubmit} onClose={onClose} />
		</section>
	);
};

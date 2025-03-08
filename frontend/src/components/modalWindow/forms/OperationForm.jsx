import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CurrencyToggle } from '../../buttons';
import { useCurrency } from '../../../hooks';
import { request } from '../../../utils';
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

	if (!accounts.length || !categories.length) {
		onClose();
		alert('Сначала необходимо добавить счета и категории расходов');
		return null;
	}

	return (
		<section id="selectors__header__and_buttons" className="flex flex-col justify-between h-full">
			<div className="flex flex-col gap-4 items-center justify-center">
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

OperationForm.propTypes = {
	onClose: PropTypes.func.isRequired,
	operationType: PropTypes.oneOf(['add', 'spend']),
};

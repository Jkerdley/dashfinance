import React, { useState, useCallback, useEffect } from 'react';
import { CurrencyToggle } from '../../buttons';
import { useCurrency } from '../../../hooks';
import { request } from '../../../utils';
import { FinalResultNewOperationItem, OperationSelectors, SaveAndCancelButtons } from '../operationSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccounts } from '../../../store/selectors';
import { fetchAccounts, fetchHistory } from '../../../store/actions/async';

export const AddOperationForm = ({ onClose, operationType }) => {
	const { isUSD, rubleCourse } = useCurrency();
	const dispatch = useDispatch();
	const accounts = useSelector(selectAccounts);

	const [formState, setFormState] = useState({
		operationDate: new Date().toISOString().split('T')[0],
		operationSumm: '',
		selectedAccount: '',
		incomeType: '',
	});

	useEffect(() => {
		if (accounts.length > 0) {
			const shouldUpdate =
				!formState.selectedAccount || !accounts.some((a) => a.id === formState.selectedAccount?.id);

			if (shouldUpdate) {
				setFormState((prev) => ({
					...prev,
					selectedAccount: accounts[0],
				}));
			}
		}
	}, [accounts]);

	const handleAccountChange = useCallback(
		(selectedId) => {
			const account = accounts.find((account) => account.id.toString() === selectedId);
			setFormState((prev) => ({ ...prev, selectedAccount: account }));
		},
		[accounts],
	);

	const handleSummChange = useCallback((event) => {
		const value = event.target.value;

		if (value === '' || !isNaN(value)) {
			setFormState((prev) => ({ ...prev, operationSumm: value }));
		} else {
			alert('Пожалуйста, введите цифры');
		}
	}, []);

	const handleIncomeTypeChange = useCallback((event) => {
		const value = event.target.value;

		setFormState((prev) => ({ ...prev, incomeType: value }));
	}, []);

	const handleDateChange = useCallback((event) => {
		setFormState((prev) => ({ ...prev, operationDate: event.target.value }));
	}, []);

	const handleFormSubmit = useCallback(
		async (event) => {
			event?.preventDefault();
			try {
				if (!formState.selectedAccount || !formState.incomeType) {
					alert('Выберите счет и напишите источник дохода');
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
					category: formState.incomeType,
					categoryId: new Date().toISOString().split('T')[0],
					icon: formState.selectedAccount.icon,
					amount: amountToSend,
					date: formState.operationDate,
					type: 'add',
					comment: formState.comment || '',
				};

				await request('/history', 'POST', formDataToSend);

				dispatch(fetchAccounts());
				dispatch(fetchHistory());

				onClose();
			} catch (error) {
				alert(`Ошибка: ${error.message}`);
			}
		},
		[formState, isUSD, rubleCourse, operationType, onClose],
	);

	if (!accounts.length) {
		onClose();
		alert('Сначала необходимо добавить счета и категории расходов');
		return;
	}

	return (
		<section
			id="selectors__header__and_buttons"
			className="flex flex-col justify-between items-center gap-8 min-h-[40vh]"
		>
			<div className="flex flex-col gap-6 items-center justify-center">
				<h3>ДОБАВИТЬ ОПЕРАЦИЮ</h3>
				<CurrencyToggle />
			</div>

			<OperationSelectors
				formState={formState}
				accounts={accounts}
				onAccountChange={handleAccountChange}
				handleIncomeTypeChange={handleIncomeTypeChange}
				isAddOperation={operationType}
			/>

			<FinalResultNewOperationItem
				handleSummChange={handleSummChange}
				handleDateChange={handleDateChange}
				handleFormSubmit={handleFormSubmit}
				formState={formState}
				isUSD={isUSD}
				isAddOperation={operationType}
			/>

			<SaveAndCancelButtons handleFormSubmit={handleFormSubmit} onClose={onClose} />
		</section>
	);
};

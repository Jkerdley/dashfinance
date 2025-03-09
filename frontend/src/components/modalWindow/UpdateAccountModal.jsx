import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BaseModal } from './base/BaseModal';
import { request } from '../../utils';
import { fetchAccounts } from '../../store/actions/async';
import { AccountForm } from './forms';

export const UpdateAccountModal = ({ isOpen, onClose, accountId, accountsInCurrency }) => {
	const selectedAccount = accountsInCurrency.find((account) => account.id === accountId);
	const transformedAccount = {
		...selectedAccount,
		balance: parseFloat(selectedAccount.balance.slice(1).trim()),
	};

	const [formData, setFormData] = useState({
		name: transformedAccount.name,
		balance: transformedAccount.balance,
		icon: transformedAccount.icon,
		type: transformedAccount.type,
	});

	const [error, setError] = useState('');
	const dispatch = useDispatch();

	const handleTypeChange = (type, icon) => {
		setFormData((prev) => ({
			...prev,
			type,
			icon,
		}));
	};

	const handleInputChange = (event) => {
		const value = event.target.value;

		if (value === '' || !isNaN(value)) {
			setFormData((prev) => ({
				...prev,
				balance: value,
			}));
		} else {
			alert('Пожалуйста, введите цифры');
		}
	};

	const HandleDeleteAccount = (event) => {};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const balanceValue = Number(formData.balance);

		if (!isNaN(balanceValue) && balanceValue >= 0) {
			try {
				await request('/accounts', 'POST', {
					...formData,
					balance: balanceValue,
				});
				dispatch(fetchAccounts());
				onClose();
			} catch (err) {
				setError(err.message);
			}
		} else {
			alert('Баланс должен быть числом и больше нуля');
		}
	};

	return (
		<BaseModal isOpen={isOpen} onClose={onClose} width="w-[40vw]" position="center">
			<section className="flex flex-col p-6 h-full">
				<AccountForm
					formData={formData}
					handleSubmit={handleSubmit}
					handleInputChange={handleInputChange}
					handleTypeChange={handleTypeChange}
					error={error}
					onClose={onClose}
					isUpdateForm={true}
				/>
			</section>
		</BaseModal>
	);
};

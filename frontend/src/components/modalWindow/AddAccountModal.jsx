import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BaseModal } from './base/BaseModal';
import { request } from '../../utils';
import { fetchAccounts } from '../../store/actions/async';
import { AccountForm } from './forms/AccountForm';

export const AddAccountModal = ({ isOpen, onClose }) => {
	const [formData, setFormData] = useState({
		name: '',
		balance: '',
		icon: 'debit',
		type: 'debit',
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

	const handleInputChange = (e) => {
		const value = e.target.value;

		if (value === '' || !isNaN(value)) {
			setFormData((prev) => ({
				...prev,
				balance: value,
			}));
		} else {
			alert('Пожалуйста, введите цифры');
		}
	};

	const handleNameChange = (event) => {
		const value = event.target.value;
		setFormData((prev) => ({
			...prev,
			name: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const nameValue = formData.name;
		const balanceValue = Number(formData.balance);

		if (nameValue.length === 0) {
			alert('Название счета не может быть пустым');
		}

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
		<BaseModal isOpen={isOpen} onClose={onClose} width="md:w-[60vw] w-[90vw]" position="center">
			<section className="flex flex-col p-6 h-full w-full">
				<AccountForm
					formData={formData}
					handleSubmit={handleSubmit}
					handleInputChange={handleInputChange}
					handleNameChange={handleNameChange}
					handleTypeChange={handleTypeChange}
					error={error}
					onClose={onClose}
				/>
			</section>
		</BaseModal>
	);
};

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseModal } from './base/BaseModal';
import { useAddAccountMutation } from '../../store/api/backendApi';
import { closeAddAccountModal } from '../../store/slices/modalSlice';
import { selectAddAccountModal } from '../../store/slices/modalSlice';
import { AccountForm } from './forms/AccountForm';

export const AddAccountModal = () => {
	const { isOpen } = useSelector(selectAddAccountModal);
	const dispatch = useDispatch();
	const [addAccount] = useAddAccountMutation();

	const [formData, setFormData] = useState({
		name: '',
		balance: '',
		icon: 'debit',
		type: 'debit',
	});
	const [error, setError] = useState('');

	const onClose = () => {
		dispatch(closeAddAccountModal());
	};

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
			return;
		}

		if (!isNaN(balanceValue) && balanceValue >= 0) {
			try {
				await addAccount({
					...formData,
					balance: balanceValue,
				}).unwrap();
				onClose();
			} catch (err) {
				setError(err.message || 'Ошибка при добавлении счета');
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

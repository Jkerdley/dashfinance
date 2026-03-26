import React, { useState } from 'react';
import { BaseModal } from './base/BaseModal';
import { useAddAccountMutation } from '../../store/api/backendApi';
import { AccountForm } from './forms/AccountForm';

export const AddAccountModal = ({ isOpen, onClose }) => {
	const [addAccount] = useAddAccountMutation();
	const [formData, setFormData] = useState({ name: '', balance: '', icon: 'debit', type: 'debit' });
	const [error, setError] = useState('');

	const handleTypeChange = (type, icon) => setFormData((prev) => ({ ...prev, type, icon }));
	const handleNameChange = (e) => setFormData((prev) => ({ ...prev, name: e.target.value }));
	const handleInputChange = (e) => {
		const value = e.target.value;
		if (value === '' || !isNaN(value)) setFormData((prev) => ({ ...prev, balance: value }));
		else alert('Пожалуйста, введите цифры');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const balanceValue = Number(formData.balance);

		if (!formData.name.trim()) return alert('Название счета не может быть пустым');
		if (isNaN(balanceValue) || balanceValue < 0) return alert('Баланс должен быть числом и больше нуля');

		try {
			await addAccount({ ...formData, balance: balanceValue }).unwrap();
			onClose();
		} catch (err) {
			setError(err.message || 'Ошибка при добавлении счета');
		}
	};

	return (
		<BaseModal isOpen={isOpen} onClose={onClose} width="md:w-[60vw] w-[90vw]" position="center">
			<div className="flex flex-col p-6 h-full w-full">
				<AccountForm
					formData={formData}
					handleSubmit={handleSubmit}
					handleInputChange={handleInputChange}
					handleNameChange={handleNameChange}
					handleTypeChange={handleTypeChange}
					error={error}
					onClose={onClose}
				/>
			</div>
		</BaseModal>
	);
};

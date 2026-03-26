import React, { useState } from 'react';
import { useUpdateAccountMutation, useDeleteAccountMutation } from '../../store/api/backendApi';
import { BaseModal } from './base/BaseModal';
import { AccountForm } from './forms';
import DeleteIcon from '../../assets/icons/delete-icon.svg';
import OutlineButton from '../buttons/OutlineButton';

export const UpdateAccountModal = ({ isOpen, onClose, accountId, accountsInCurrency }) => {
	const selectedAccount = accountsInCurrency.find((acc) => acc.id === accountId);

	const [formData, setFormData] = useState({
		name: selectedAccount?.name || '',
		balance: selectedAccount ? parseFloat(selectedAccount.balance.slice(1).trim()) : '',
		icon: selectedAccount?.icon || 'debit',
		type: selectedAccount?.type || 'debit',
	});

	const [error, setError] = useState('');
	const [updateAccount] = useUpdateAccountMutation();
	const [deleteAccount] = useDeleteAccountMutation();

	const handleTypeChange = (type, icon) => setFormData((prev) => ({ ...prev, type, icon }));
	const handleNameChange = (e) => setFormData((prev) => ({ ...prev, name: e.target.value }));
	const handleInputChange = (e) => {
		const value = e.target.value;
		if (value === '' || !isNaN(value)) setFormData((prev) => ({ ...prev, balance: value }));
		else alert('Пожалуйста, введите цифры');
	};

	const handleDeleteAccount = async () => {
		if (window.confirm('Вы уверены что хотите удалить счет?')) {
			try {
				await deleteAccount(accountId).unwrap();
				onClose();
			} catch (err) {
				setError(err.data?.error || err.message);
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const balanceValue = Number(formData.balance);

		if (!formData.name.trim()) return alert('Название счета не может быть пустым');
		if (isNaN(balanceValue) || balanceValue < 0) return alert('Баланс должен быть числом и больше нуля');

		try {
			await updateAccount({ id: accountId, ...formData, balance: balanceValue }).unwrap();
			onClose();
		} catch (err) {
			setError(err.data?.error || err.message);
		}
	};

	return (
		<BaseModal isOpen={isOpen} onClose={onClose} width="md:w-[60vw] w-[90vw]" position="center">
			<div className="flex flex-col justify-center p-4 h-full">
				<AccountForm
					formData={formData}
					handleSubmit={handleSubmit}
					handleInputChange={handleInputChange}
					handleNameChange={handleNameChange}
					handleTypeChange={handleTypeChange}
					error={error}
					onClose={onClose}
					isUpdateForm={true}
				/>
				<div className="flex justify-center mb-4">
					<OutlineButton icon={DeleteIcon} onClick={handleDeleteAccount}>
						Удалить счет
					</OutlineButton>
				</div>
			</div>
		</BaseModal>
	);
};

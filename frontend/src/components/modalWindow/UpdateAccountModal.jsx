import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BaseModal } from './base/BaseModal';
import { request } from '../../utils';
import { fetchAccounts } from '../../store/actions/async';
import { AccountForm } from './forms';
import DeleteIcon from '../../assets/icons/delete-icon.svg';
import OutlineButton from '../buttons/OutlineButton';

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

	const handleDeleteAccount = async () => {
		if (confirm('Вы уверены что хотите удалить счет?')) {
			console.log('Счет удален');

			// try {
			// 	await request('/accounts', 'DELETE', { accountId });
			// 	dispatch(fetchAccounts());
			// 	onClose();
			// } catch (error) {
			// 	setError(error.message);
			// }
		}
	};

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
			} catch (error) {
				setError(error.message);
			}
		} else {
			alert('Баланс должен быть числом и больше нуля');
		}
	};

	return (
		<BaseModal isOpen={isOpen} onClose={onClose} width="w-[40vw]" position="center">
			<section className="flex flex-col justify-center p-4 h-full">
				<AccountForm
					formData={formData}
					handleSubmit={handleSubmit}
					handleInputChange={handleInputChange}
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
			</section>
		</BaseModal>
	);
};

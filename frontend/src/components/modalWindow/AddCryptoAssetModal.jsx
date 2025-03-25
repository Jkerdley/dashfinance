import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BaseModal } from './base/BaseModal';
import { request } from '../../utils';
import { fetchAccounts } from '../../store/actions/async';
import { CryptoAssetForm } from './forms';

export const AddCryptoAssetModal = ({ isOpen, onClose }) => {
	const [formData, setFormData] = useState({
		name: '',
		balance: '',
		icon: '',
	});
	const [error, setError] = useState('');
	const dispatch = useDispatch();

	const handleFindCrypto = (event) => {
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
			alert('Название крипто-актива не может быть пустым');
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
				<CryptoAssetForm
					formData={formData}
					handleSubmit={handleSubmit}
					handleFindCrypto={handleFindCrypto}
					error={error}
					onClose={onClose}
				/>
			</section>
		</BaseModal>
	);
};

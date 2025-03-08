import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BaseModal } from './base/BaseModal';
import { request } from '../../utils';
import { fetchAccounts } from '../../store/actions/async';
import { SaveAndCancelButtons } from './operationSelectors';

const ACCOUNT_TYPES = [
	{
		label: 'Дебетовый',
		value: 'debit',
		icon: 'debit',
	},
	{
		label: 'Кредитный',
		value: 'credit',
		icon: 'credit',
	},
	{
		label: 'Подарочный',
		value: 'gift',
		icon: 'gift',
	},
	{
		label: 'Наличные',
		value: 'cash',
		icon: 'cash',
	},
];

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (formData.balance >= 0) {
			try {
				await request('/accounts', 'POST', {
					...formData,
					balance: Number(formData.balance),
				});
				dispatch(fetchAccounts());
				onClose();
			} catch (err) {
				setError(err.message);
			}
		} else {
			alert('Баланс должен быть больше ноля');
		}
	};

	return (
		<BaseModal isOpen={isOpen} onClose={onClose} width="w-[40vw]" height="h-[50vh]" position="center">
			<section className="p-6">
				<h2 className="text-2xl mb-4">Добавить новый счет</h2>

				{error && <div className="text-red-500 mb-4">{error}</div>}

				<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
					<section>
						<label className="block mb-2">Название счета:</label>
						<input
							type="text"
							className="w-full p-2 rounded-lg bg-sky-950/50"
							value={formData.name}
							onChange={(e) => setFormData({ ...formData, name: e.target.value })}
							required
						/>
					</section>

					<section>
						<label className="block mb-2">Начальный баланс:</label>
						<input
							type="number"
							className="w-full p-2 rounded-lg bg-sky-950/50"
							value={formData.balance}
							onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
							required
						/>
					</section>

					<section className="mt-4">
						<label className="block mb-2">Тип счета:</label>
						<div className="grid grid-cols-2 gap-4">
							{ACCOUNT_TYPES.map(({ label, value, icon }) => (
								<label
									key={value}
									className={`flex items-center p-3 rounded-lg cursor-pointer 
                    ${formData.type === value ? 'bg-sky-800/50' : 'bg-sky-950/50'}`}
								>
									<input
										type="radio"
										name="accountType"
										value={value}
										checked={formData.type === value}
										onChange={() => handleTypeChange(value, icon)}
										className="hidden"
									/>
									<div className="flex items-center gap-2">
										<span
											className={`w-4 h-4 rounded-full border-2 
                      ${formData.type === value ? 'bg-main-green border-gray-400' : 'border-gray-400'}`}
										/>
										<span>{label}</span>
									</div>
								</label>
							))}
						</div>
					</section>

					<SaveAndCancelButtons handleFormSubmit={handleSubmit} onClose={onClose} />
				</form>
			</section>
		</BaseModal>
	);
};

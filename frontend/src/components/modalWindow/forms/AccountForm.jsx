import React from 'react';
import { ACCOUNT_TYPES } from './ACCOUNT_TYPES';
import { SaveAndCancelButtons } from '../operationSelectors';
export const AccountForm = ({
	formData,
	handleSubmit,
	handleInputChange,
	handleNameChange,
	handleTypeChange,
	error,
	onClose,
	isUpdateForm,
}) => {
	return (
		<>
			<h2 className="text-2xl mb-2">{isUpdateForm ? 'Изменить счет' : 'Добавить новый счет'}</h2>
			{error && <div className="mb-4">{error}</div>}

			<form className="flex flex-col gap-6 items-center justify-between" onSubmit={handleSubmit}>
				<section className="flex flex-col md:w-3/5 w-5/5">
					<label className="block mb-2 w-full">Название счета:</label>
					<input
						type="text"
						name="name"
						className="w-full p-2 rounded-lg bg-sky-950/50"
						value={formData.name}
						onChange={handleNameChange}
						required
					/>
				</section>

				<section className="flex flex-col md:w-3/5 w-5/5">
					<label className="block mb-2">
						{isUpdateForm ? 'Баланс счета' : 'Начальный баланс:'}
					</label>
					<input
						type="text"
						name="balance"
						className="w-full p-2 rounded-lg bg-sky-950/50"
						value={formData.balance}
						onChange={handleInputChange}
						required
					/>
				</section>

				<section className="mt-2 mb-2">
					<label className="block mb-2">Тип счета:</label>
					<div className="grid md:grid-cols-2 grid-cols-1 gap-3">
						{ACCOUNT_TYPES.map(({ label, value, icon }) => (
							<label
								key={value}
								className={`flex items-center truncate p-3 rounded-lg cursor-pointer 
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
		</>
	);
};

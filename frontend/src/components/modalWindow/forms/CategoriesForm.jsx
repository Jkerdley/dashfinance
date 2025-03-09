import React from 'react';
import { SaveAndCancelButtons } from '../operationSelectors';
export const CategoriesForm = ({
	formData,
	handleSubmit,
	handleInputChange,
	handleNameChange,
	error,
	onClose,
	isUpdateForm,
}) => {
	return (
		<>
			<h2 className="text-2xl mb-4">
				{isUpdateForm ? 'Изменить категорию расходов' : 'Добавить категорию расходов'}
			</h2>
			{error && <div className="mb-4">{error}</div>}

			<form className="flex flex-col gap-6 items-center justify-between" onSubmit={handleSubmit}>
				<section className="flex flex-col w-3/5">
					<label className="block mb-2 w-full">Название категории расходов:</label>
					<input
						type="text"
						name="name"
						className="w-full p-2 rounded-lg bg-sky-950/50"
						value={formData.name}
						onChange={handleNameChange}
						required
					/>
				</section>

				<section className="flex flex-col w-3/5">
					<label className="block mb-2">Бюджет на месяц</label>
					<input
						type="text"
						name="budget"
						className="w-full p-2 rounded-lg bg-sky-950/50"
						value={formData.budget}
						onChange={handleInputChange}
						required
					/>
				</section>

				<SaveAndCancelButtons handleFormSubmit={handleSubmit} onClose={onClose} />
			</form>
		</>
	);
};

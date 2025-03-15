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
		<section className="flex flex-col items-center justify-evenly gap-6 min-h-[25vh] w-full">
			<h2 className="text-2xl">
				{isUpdateForm ? 'Изменить категорию расходов' : 'Добавить категорию расходов'}
			</h2>
			{error && <div className="mb-4">{error}</div>}

			<form
				className="flex flex-col gap-6 items-center justify-between w-full h-full"
				onSubmit={handleSubmit}
			>
				<section className="flex flex-col md:w-2/5 w-4/5">
					<label className="block mb-2 w-full">Категория расходов:</label>
					<input
						type="text"
						name="name"
						className="w-full p-2 rounded-lg bg-sky-950/50"
						value={formData.name}
						onChange={handleNameChange}
						required
					/>
				</section>

				<section className="flex flex-col md:w-2/5 w-4/5">
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
		</section>
	);
};

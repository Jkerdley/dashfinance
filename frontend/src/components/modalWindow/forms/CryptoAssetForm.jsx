import React from 'react';
import { SaveAndCancelButtons } from '../operationSelectors';
export const CryptoAssetForm = ({
	formData,
	handleSubmit,
	handleFindCrypto,
	error,
	onClose,
	isUpdateForm,
}) => {
	return (
		<>
			<h2 className="text-2xl mb-6">
				{isUpdateForm ? 'Изменить крипто-актив' : 'Добавить крипто-актив'}
			</h2>
			{error && <div className="mb-6">{error}</div>}

			<form className="flex flex-col gap-8 items-center justify-between" onSubmit={handleSubmit}>
				<section className="flex flex-col md:w-3/5 w-5/5">
					<label className="block mb-2 w-full">Поиск по названию:</label>
					<input
						type="text"
						name="coin name"
						placeholder="Введите название криптовалюты (пример: Bitcoin)"
						className="w-full p-2 rounded-lg bg-sky-950/60"
						value={formData.name}
						onChange={handleFindCrypto}
						required
					/>
				</section>
				{formData.name && (
					<section className="mt-2 mb-2">
						<span className="block mb-2">Выбранный актив</span>
						<div className="flex items-center gap-2 rounded-lg min-h-[5vh] px-2 bg-sky-800/90">
							{formData.icon} {formData.name}
						</div>
					</section>
				)}

				<SaveAndCancelButtons handleFormSubmit={handleSubmit} onClose={onClose} />
			</form>
		</>
	);
};

import React from 'react';
import { SaveAndCancelButtons } from '../operationSelectors';
import { CardIcon } from '../../CardIcon';
export const CryptoAssetForm = ({
	formData,
	searchTerm,
	handleSubmit,
	error,
	onClose,
	handleFindCrypto,
	handleSelectCoin,
	searchResults,
	showDropdown,
}) => {
	return (
		<>
			<h2 className="text-2xl mb-6">Добавить крипто-актив</h2>
			{error && <div className="mb-6 text-main-red">Ошибка: {error}</div>}

			<form className="flex flex-col gap-8 items-center justify-between" onSubmit={handleSubmit}>
				<section className="flex flex-col md:w-3/5 w-5/5 relative">
					<label className="block mb-2 w-full">Поиск по названию:</label>
					<input
						type="text"
						name="coin name"
						placeholder="Введите название криптовалюты (пример: Bitcoin)"
						className="w-full p-2 rounded-lg bg-sky-950/60"
						value={searchTerm}
						onChange={handleFindCrypto}
						required
					/>
					{showDropdown && searchTerm && (
						<div className="absolute top-full left-0 right-0 z-50 bg-sky-950/90 max-h-70 overflow-y-auto mt-1 rounded-lg scrollbar">
							{searchResults.map((coin) => (
								<div
									key={coin.id}
									onClick={() => handleSelectCoin(coin)}
									className="p-2 hover:bg-sky-800/60 cursor-pointer flex items-center gap-2"
								>
									<CardIcon icon={coin.icon} />
									{coin.name}
								</div>
							))}
						</div>
					)}
				</section>

				{formData.name && (
					<section className="mt-2 mb-2">
						<span className="block mb-2">Выбранный актив</span>
						<div className="flex items-center gap-2 rounded-2xl min-h-[5vh] p-2 bg-sky-800/70">
							<CardIcon icon={formData.icon} /> {formData.name}
						</div>
					</section>
				)}

				<SaveAndCancelButtons
					mainTitle={'Добавить'}
					handleFormSubmit={handleSubmit}
					onClose={onClose}
				/>
			</form>
		</>
	);
};

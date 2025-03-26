import React from 'react';
import { SaveAndCancelButtons } from '../operationSelectors';
import { CardIcon } from '../../CardIcon';
export const CryptoAssetUpdate = ({ selectedAsset, error, onClose }) => {
	return (
		<section className="flex flex-col items-center justify-evenly gap-6 min-h-[25vh] w-full">
			{/* <h2 className="text-2xl">Обновить криптоактив</h2> */}
			{error && <div className="mb-4">{error}</div>}

			<form
				className="flex flex-col gap-6 items-center justify-between w-full h-full"
				// onSubmit={handleSubmit}
			>
				{selectedAsset.name && (
					<div className="flex mt-2 mb-2 items-center gap-2 pr-6 rounded-2xl min-h-[5vh] p-2 bg-sky-800/70">
						<CardIcon icon={selectedAsset.icon} /> {selectedAsset.name}
					</div>
				)}

				<div className="absolute top-full left-0 right-0 z-50 bg-sky-950/90 max-h-70 overflow-y-auto mt-1 rounded-lg scrollbar">
					{selectedAsset.history.map((coin) => (
						<div
							key={coin.id}
							// onClick={() => handleSelectCoin(coin)}
							className="p-2 hover:bg-sky-800/60 cursor-pointer flex items-center text-left gap-2"
						>
							<CardIcon icon={coin.icon} />
							{coin.name}
						</div>
					))}
				</div>

				{/* <SaveAndCancelButtons handleFormSubmit={handleSubmit} onClose={onClose} /> */}
			</form>
		</section>
	);
};

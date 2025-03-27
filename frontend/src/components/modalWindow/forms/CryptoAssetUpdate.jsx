import React from 'react';
import { SaveAndCancelButtons } from '../operationSelectors';
import { CardIcon } from '../../CardIcon';
import { CryptoOperationHistory } from '../../../pages/CryptoPage/CryptoOperationHistory';
import { calculateValueInCurrency } from '../../../utils';
import { CurrencyToggle } from '../../buttons';
import { useCurrency } from '../../../hooks';

export const CryptoAssetUpdate = ({ selectedAsset, error, onClose }) => {
	const { isUSD, rubleCourse } = useCurrency();

	return (
		<section className="flex flex-col items-center justify-evenly gap-6 min-h-[25vh] w-full">
			<h2 className="text-2xl">Обновить криптоактив</h2>
			{/* <CurrencyToggle /> */}
			{error && <div className="mb-4">{error}</div>}
			{selectedAsset.name && (
				<div className="flex mt-2 mb-2 items-center gap-2 pr-6 rounded-2xl min-h-[5vh] p-2 bg-sky-800/70">
					<CardIcon icon={selectedAsset.icon} /> {selectedAsset.name}
				</div>
			)}
			<div className="flex flex-col w-full bg-sky-950/90 max-h-50 overflow-y-auto rounded-lg scrollbar">
				{selectedAsset.history.map((coin) => (
					<div
						key={coin._id}
						// onClick={() => handleSelectCoin(coin)}
						className="p-2 hover:bg-sky-800/60 cursor-pointer flex items-center text-left gap-2"
					>
						<CryptoOperationHistory
							id={coin._id}
							coinId={selectedAsset.coinId}
							coin={coin.asset}
							symbol={selectedAsset.symbol}
							icon={selectedAsset.icon}
							price={coin.checkPrice}
							operationAmount={calculateValueInCurrency(coin.checkSumm, isUSD, rubleCourse)}
							assetAmount={coin.assetAmount}
							operationType={coin.type}
							exchangedAsset={coin.exchangedAsset}
							operationDate={coin.date}
						/>
					</div>
				))}
			</div>

			<form
				className="flex flex-col gap-6 items-center justify-between w-full h-full"
				// onSubmit={handleSubmit}
			>
				{/* <SaveAndCancelButtons handleFormSubmit={handleSubmit} onClose={onClose} /> */}
			</form>
		</section>
	);
};

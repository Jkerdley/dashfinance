import React from 'react';
import { SaveAndCancelButtons } from '../operationSelectors';
import { CardIcon } from '../../CardIcon';
import { CryptoOperationHistory } from '../../../pages/CryptoPage/CryptoOperationHistory';
import { calculateValueInCurrency } from '../../../utils';
import { CurrencyToggle } from '../../buttons';
import { useCurrency } from '../../../hooks';
import { CryptoAssets } from '../../../pages/CryptoPage/CryptoPortfolioList';

export const CryptoAssetUpdate = ({ selectedAsset, error, onClose }) => {
	const { isUSD, rubleCourse } = useCurrency();

	return (
		<section className="flex flex-col items-center justify-evenly gap-6 min-h-[25vh] w-full">
			<h2 className="text-2xl">Обновить криптоактив</h2>
			<CurrencyToggle />
			{error && <div className="mb-4">{error}</div>}

			<div className="mt-2 min-w-2/3 md:min-w-1/2 mb-2 items-center">
				<CryptoAssets
					id={selectedAsset.id}
					averageBuyPrice={selectedAsset.averagePrice}
					assetsAmount={selectedAsset.assetAmount}
					coinPrice={selectedAsset.price}
					profit={selectedAsset.profit}
					profitPercentage={selectedAsset.profitPercentage}
					growValue={selectedAsset.growValue}
					coinTitle={selectedAsset.name}
					icon={selectedAsset.icon}
					symbol={selectedAsset.symbol}
					inAssetCard={true}
				/>
			</div>

			<div className="flex flex-col w-full bg-sky-950/90 max-h-50 overflow-y-auto rounded-lg scrollbar">
				{selectedAsset.history.map((coin) => (
					<div
						key={coin._id}
						// onClick={() => handleSelectCoin(coin)}
						className="flex p-2 hover:bg-sky-800/60 cursor-pointer overflow-hidden"
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
							inModal={true}
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

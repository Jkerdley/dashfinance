import React from 'react';
import OutlineButton from '../../../../buttons/OutlineButton';
import AddIcon from '../../../../../assets/icons/add-icon.svg';
import { fetchedCoinsPrices } from '../../../../../db';
import { CryptoAssets } from '../../CryptoAssets/CryptoAssets';
import { calculateValueInCurrency } from '../../../../../utils/calculateValueInCurrency';
import { OperationsPanel } from '../../../../OperationsPanelButtons/OperationsPanel';

export const MyCriptoPortfolioList = ({ isUSD, rubleCourse }) => {
	const coinValuesInCurrency = fetchedCoinsPrices.result.map((coin) => ({
		...coin,
		assetsBuyPriceAVG: calculateValueInCurrency(Number(coin.assetsBuyPriceAVG), isUSD, rubleCourse),
		coinPrice: calculateValueInCurrency(Number(coin.price), isUSD, rubleCourse),
		profit: calculateValueInCurrency(Number(coin.price * coin.assetsAmount), isUSD, rubleCourse),
	}));

	return (
		<div id="column__categories" className="flex flex-col flex-3 p-4 rounded-3xl bg-sky-950/40">
			<div id="categories__title-and-buitton" className="flex justify-between gap-2 mb-2">
				<p className="flex text-2xl font-medium mb-2 truncate">Мои активы</p>
				<OutlineButton to={''} disabled={false} icon={AddIcon} alt="finance accounts">
					<span className="text-base">Добавить/Удалить</span>
				</OutlineButton>
			</div>
			<div
				id="spend-categories__container"
				className="flex flex-4 flex-wrap gap-4 pr-2 justify-between max-h-[38vh] w-full h-full rounded-2xl overflow-y-auto overscroll-auto scroll-smooth scrollbar"
			>
				{coinValuesInCurrency.map((coin) => {
					return (
						<CryptoAssets
							key={coin.id}
							averageBuyPrice={coin.assetsBuyPriceAVG}
							assetsAmount={parseFloat(coin.assetsAmount)}
							coinPrice={coin.coinPrice}
							profit={coin.profit}
							growValue={parseFloat(coin.priceChange1d)}
							coinTitle={coin.name}
							icon={coin.icon}
							symbol={coin.symbol}
						/>
					);
				})}
			</div>
			<OperationsPanel onCryptoClick={null} isCrypto={true} />
		</div>
	);
};

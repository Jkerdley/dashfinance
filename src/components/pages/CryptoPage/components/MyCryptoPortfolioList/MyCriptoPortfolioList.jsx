import React from 'react';
import OutlineButton from '../../../../buttons/OutlineButton';
import AddIcon from '../../../../../assets/icons/add-icon.svg';
import { fetchedCoinsPrices } from '../../../../../db';
import { CryptoAssets } from '../../CryptoAssets/CryptoAssets';

export const MyCriptoPortfolioList = () => {
	return (
		<div id="column__categories" className="flex flex-col flex-4	 p-4 rounded-3xl bg-sky-950/40">
			<div id="categories__title-and-buitton" className="flex justify-between gap-2 mb-2">
				<p className="flex text-2xl font-medium mb-2 truncate">Мои активы</p>
				<OutlineButton to={''} disabled={false} icon={AddIcon} alt="finance accounts">
					<span className="text-base">Добавить/Удалить</span>
				</OutlineButton>
			</div>
			<div
				id="spend-categories__container"
				className="flex flex-4 flex-wrap gap-4 pr-2 justify-between max-h-[35vh] w-full rounded-[16px] overflow-y-auto overscroll-auto scroll-smooth scrollbar"
			>
				{fetchedCoinsPrices.result.map((coin) => {
					return (
						<CryptoAssets
							key={coin.id}
							averageBuyPrice={coin.assetsBuyPriceAVG}
							assetsAmount={parseFloat(coin.assetsAmount)}
							coinPrice={parseFloat(coin.price).toFixed(2)}
							growValue={parseFloat(coin.priceChange1d)}
							categorie={coin.name}
							icon={coin.icon}
							symbol={coin.symbol}
						/>
					);
				})}
			</div>
		</div>
	);
};

import React from 'react';
import AddIcon from '../../../../assets/icons/add-icon.svg';
import { fetchedCoinsPrices } from '../../../../db';
import { CryptoAssets } from '../../CryptoAssets/CryptoAssets';
import { calculateValueInCurrency } from '../../../../utils';
import { OperationsPanel } from '../../../../components/OperationsPanelButtons/OperationsPanel';
import { SectionContainerHeader } from '../../../../components/SectionContainerHeader/SectionContainerHeader';
import { EditAddDeleteButton } from '../../../../components/buttons';
import { useCurrency } from '../../../../hooks';
import { useFetchCryptoAssetsInCurrency } from '../../../../hooks/useFetchCryptoAssetsInCurrency';

export const MyCriptoPortfolioList = () => {
	const { isUSD, rubleCourse } = useCurrency();
	const coinValuesInCurrency = fetchedCoinsPrices.result.map((coin) => ({
		...coin,
		assetsBuyPriceAVG: calculateValueInCurrency(Number(coin.assetsBuyPriceAVG), isUSD, rubleCourse),
		coinPrice: calculateValueInCurrency(Number(coin.price), isUSD, rubleCourse),
		profit: calculateValueInCurrency(Number(coin.price * coin.assetsAmount), isUSD, rubleCourse),
	}));

	const { cryptoAssetsInCurrency, isLoading, cryptoHistory } = useFetchCryptoAssetsInCurrency();
	console.log('cryptoAssetsInCurrency in portfolio', cryptoAssetsInCurrency);
	console.log('coinValuesInCurrency  in portfolio', coinValuesInCurrency);

	return (
		<section id="column__categories" className="flex flex-col flex-3 p-4 rounded-3xl bg-sky-950/40">
			<div id="categories__title-and-buitton" className="flex justify-between gap-2 mb-2">
				<SectionContainerHeader title={'Активы'} />
				<EditAddDeleteButton icon={AddIcon} title={'Добавить/Удалить'} to={''} alt={'crypto coins'} />
			</div>
			<div
				id="spend-categories__container"
				className="flex flex-4 flex-wrap gap-4 pr-2 justify-between max-h-[38vh] w-full h-full rounded-2xl overflow-y-auto overscroll-auto scroll-smooth scrollbar"
			>
				{cryptoAssetsInCurrency.map((coin) => {
					return (
						<CryptoAssets
							key={coin._id}
							averageBuyPrice={coin.averagePrice}
							assetsAmount={parseFloat(coin.assetAmount)}
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
		</section>
	);
};

import React from 'react';
import { CardIcon } from '../../../components/CardIcon';
import { OptionsButton } from '../../../components/buttons';

export const CryptoAssets = ({
	coinTitle,
	coinPrice,
	profit,
	assetsAmount,
	averageBuyPrice,
	icon,
	symbol,
	growValue,
}) => {
	// const trimmedCoinPrice = parseFloat(coinPrice.slice(1).trim());
	// const trimmedAverageBuyPrice = parseFloat(averageBuyPrice.slice(1).trim());

	const isCoinPriceGrow = () => {
		if (!assetsAmount) {
			return 'text-main-green';
		} else if (Number(growValue) < 0) {
			return 'text-main-red';
		} else {
			return 'text-main-green';
		}
	};
	// const isProfitAsset = () => {
	// 	if (!assetsAmount) {
	// 		return 'text-white';
	// 	} else if (Number(trimmedCoinPrice) < Number(trimmedAverageBuyPrice)) {
	// 		return 'text-main-red';
	// 	} else {
	// 		return 'text-main-green';
	// 	}
	// };

	// const calculatedProfitPercentage = () => {
	// 	return Number(
	// 		parseFloat((trimmedCoinPrice - trimmedAverageBuyPrice) / trimmedAverageBuyPrice) * 100,
	// 	).toFixed(2);
	// };

	return (
		<div
			id="categorie-wrapper"
			className="flex flex-2 max-w-full items-center justify-between p-2 rounded-2xl h-14 bg-sky-300/20 "
		>
			<div
				id="categorie-inside-container"
				className="flex flex-6 items-center justify-between min-w-90 w-auto"
			>
				<CardIcon size={6} padding="p-2" buttonSize={11} icon={icon} />
				<div id="categorie-text-container" className="flex flex-col mx-2 w-full truncate">
					<div className={`flex text-base items-between justify-between truncate overflow-hidden`}>
						{/* <div className={`flex gap-2 justify-center items-center truncate ${isProfitAsset()}`}>
							<span className="truncate">{coinTitle}</span>
							<div
								id="up-and-down__icon_triangle"
								className={`flex h-2 w-2 truncate ${calculatedProfitPercentage() < 0 ? 'triangle-down' : 'triangle-up'} `}
							/>
							<span className="text-sm truncate">Profit {calculatedProfitPercentage()} %</span>
						</div>
						<div className="flex gap-2 truncate">{profit}</div> */}
					</div>

					<div id="categorie-budjet-container" className="flex justify-between gap-2">
						<div className="flex gap-3">
							<span className={`text-sm ${isCoinPriceGrow()}`}>{coinPrice}</span>
							<span className={`text-sm ${isCoinPriceGrow()}`}>{growValue} %</span>
						</div>
						<span className={`text-sm truncate`}>
							{assetsAmount ? `${assetsAmount} ${symbol}` : ''}
						</span>
					</div>
				</div>
			</div>
			<OptionsButton to={''} flex={'flex-[0.25]'} />
		</div>
	);
};

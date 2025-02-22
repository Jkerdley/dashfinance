import React from 'react';
import { CardIcon, OptionsButton } from '../../../buttons';

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
	const trimmedCoinPrice = parseFloat(coinPrice.slice(1).trim());
	const trimmedAverageBuyPrice = parseFloat(averageBuyPrice.slice(1).trim());

	const isCoinPriceGrow = () => {
		if (!assetsAmount) {
			return 'text-lime-300';
		} else if (Number(growValue) < 0) {
			return 'text-rose-300';
		} else {
			return 'text-lime-200';
		}
	};
	const isProfitAsset = () => {
		if (!assetsAmount) {
			return 'text-white';
		} else if (Number(trimmedCoinPrice) < Number(trimmedAverageBuyPrice)) {
			return 'text-rose-300';
		} else {
			return 'text-lime-200';
		}
	};

	const calculatePercentage = (newBuyPrice, oldBuyPrice) => {
		return +(parseFloat((newBuyPrice - oldBuyPrice) / oldBuyPrice) * 100).toFixed(2);
	};

	return (
		<div
			id="categorie-wrapper"
			className="flex flex-2 max-w-3xl items-center justify-between p-2 rounded-2xl h-14 bg-sky-300/20 "
		>
			<div
				id="categorie-inside-container"
				className="flex flex-6 items-center justify-between min-w-90 w-auto"
			>
				<CardIcon size={6} padding="p-2" buttonSize={11} icon={icon} />
				<div id="categorie-text-container" className="flex flex-col mx-2 w-full overflow-hidden ">
					<div className={`flex text-base items-between justify-between`}>
						<div
							className={`flex gap-2 justify-center items-center truncate flex-nowrap overflow-hidden ${isProfitAsset()}`}
						>
							<span className="truncate">{coinTitle}</span>
							<div
								id="up-and-down__icon_triangle"
								className={`flex h-2 w-2 ${+calculatePercentage(trimmedCoinPrice, trimmedAverageBuyPrice) < 0 ? 'triangle-down' : 'triangle-up'} `}
							/>
							<span className="text-sm truncate">
								Profit {calculatePercentage(trimmedCoinPrice, trimmedAverageBuyPrice)} %
							</span>
						</div>
						<div className="flex gap-2 truncate overflow-hidden ">{profit}</div>
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

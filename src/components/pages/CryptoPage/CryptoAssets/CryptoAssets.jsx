import React from 'react';
import { CardIcon } from '../../../buttons';
import OptionsIcon from '../../../../assets/icons/options-icon.svg';
import { EditButton } from '../../../buttons/EditButton';

export const CryptoAssets = ({
	categorie,
	coinPrice,
	assetsAmount,
	averageBuyPrice,
	icon,
	symbol,
	growValue,
}) => {
	const isOverBalance = () => {
		if (!assetsAmount) {
			return 'text-lime-300';
		} else if (Number(growValue) < 0) {
			return 'text-rose-300';
		} else {
			return 'text-lime-200';
		}
	};
	const isProfitAssetValue = () => {
		if (!assetsAmount) {
			return 'text-white';
		} else if (Number(coinPrice) < Number(averageBuyPrice)) {
			return 'text-rose-300';
		} else {
			return 'text-lime-200';
		}
	};

	const calculatePercentage = (newBuyPrice, oldBuyPrice) => {
		return +(parseFloat((newBuyPrice - oldBuyPrice) / oldBuyPrice) * 100).toFixed(2);
	};

	console.log('calculatePercentage', calculatePercentage(coinPrice, averageBuyPrice));

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
						<div className={`flex gap-2 justify-center items-center ${isProfitAssetValue()}`}>
							{categorie}
							<div
								id="up-and-down__icon_triangle"
								className={`h-3 w-3 ${+calculatePercentage(coinPrice, averageBuyPrice) < 0 ? 'triangle-down' : 'triangle-up'} `}
							/>
							{calculatePercentage(coinPrice, averageBuyPrice)} %
						</div>
						<div className="flex gap-2">
							<div className={`${isProfitAssetValue()}`}>
								$ {parseInt(assetsAmount * coinPrice)}
							</div>
						</div>
					</div>

					<div id="categorie-budjet-container" className="flex justify-between gap-2">
						<div className="flex gap-3">
							<span className={`text-sm ${isOverBalance()}`}>${coinPrice}</span>
							<span className={`text-sm ${isOverBalance()}`}>{growValue} %</span>
						</div>
						<span className={`text-sm truncate ${isProfitAssetValue()}`}>
							{assetsAmount ? `${assetsAmount} ${symbol}` : ''}
						</span>
					</div>
				</div>
			</div>
			<div id="categorie-icon-container" className="flex flex-[0.5] justify-end">
				<EditButton to={''} size={5} icon={OptionsIcon}></EditButton>
			</div>
		</div>
	);
};

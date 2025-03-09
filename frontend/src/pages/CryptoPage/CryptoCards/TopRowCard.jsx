import React from 'react';
import { calculateValueInCurrency } from '../../../utils';
import { useCurrency } from '../../../hooks';
import { CardIcon } from '../../../components/CardIcon';

export const TopRowCard = ({ assetData, flex, isAddButton, disabled, onClick }) => {
	const { isUSD, rubleCourse } = useCurrency();
	const priceInCurrency = calculateValueInCurrency(assetData.price, isUSD, rubleCourse);

	console.log('assetData', assetData);
	const isDisabled = disabled ? '' : 'cursor-pointer';
	return isAddButton ? (
		<button onClick={onClick} className={`group flex flex-1/12 w-auto rounded-3xl ${isDisabled}`}>
			<div
				className={`flex py-2 px-4 ${flex} bg-sky-700/20 h-auto min-h-26 items-center justify-center rounded-3xl`}
			>
				<span
					className={`flex mb-1 duration-150 ease-in-out transition-all text-5xl font-bold ${disabled ? 'text-gray-100/20' : 'text-gray-100/70 group-hover:scale-110'}`}
				>
					&#43;
				</span>
			</div>
		</button>
	) : (
		<section className={`flex flex-col py-4 px-4 ${flex} bg-sky-950/40 min-h-26 rounded-3xl`}>
			<div className="flex flex-col gap-2 items-start">
				<div className="flex gap-3 items-center">
					<CardIcon icon={assetData.icon} />
					<span className="text-2xl font-medium truncate">{assetData.symbol}</span>
					<span className="text-2xl font-medium truncate"> {priceInCurrency}</span>
				</div>
				<div className="flex gap-3 items-center justify-center bg-amber-900">
					<div className="flex gap-2 items-center bg-amber-500">
						<span>Рост за неделю:</span>
						<span
							className={`text-xl font-medium truncate ${parseFloat(assetData.priceChange1w) < 0 ? 'text-main-red' : 'text-main-green'}`}
						>
							{assetData.priceChange1w}
						</span>
					</div>
				</div>
			</div>
		</section>
	);
};

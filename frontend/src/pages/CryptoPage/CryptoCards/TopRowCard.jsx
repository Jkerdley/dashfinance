import React from 'react';
import { calculateValueInCurrency } from '../../../utils';
import { useCurrency } from '../../../hooks';
import { CardIcon } from '../../../components/CardIcon';

export const TopRowCard = ({ assetData, flex, isAddButton, disabled, onClick }) => {
	const { isUSD, rubleCourse } = useCurrency();
	const priceInCurrency = calculateValueInCurrency(assetData.price, isUSD, rubleCourse);
	console.log('parseFloat(assetData.priceChange1d', parseFloat(assetData.priceChange1d));

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
					<div
						className={`flex gap-5 items-center justify-center text-xl font-medium truncate ${parseFloat(assetData.priceChange1h) < 0 ? 'text-main-red' : 'text-main-green'}`}
					>
						{priceInCurrency}
						<div
							className={`flex items-center gap-1 text-xl font-medium truncate ${parseFloat(assetData.priceChange1h) < 0 ? 'text-main-red' : 'text-main-green'}`}
						>
							{' '}
							<span
								className={`flex h-2 w-2 truncate ${parseFloat(assetData.priceChange1h) < 0 ? 'triangle-down' : 'triangle-up'} `}
							></span>
							{assetData.priceChange1h} %
						</div>
					</div>
				</div>
				<div className="flex pl-1 gap-4 items-center justify-center w-full">
					<div className="flex gap-2 items-center w-full">
						<span className="truncate">За неделю:</span>
						<div
							className={`flex items-center gap-1 text-xl font-medium truncate ${parseFloat(assetData.priceChange1w) < 0 ? 'text-main-red' : 'text-main-green'}`}
						>
							{assetData.priceChange1w}
							<span
								className={`flex h-2 w-2 truncate ${parseFloat(assetData.priceChange1w) < 0 ? 'triangle-down' : 'triangle-up'} `}
							></span>
						</div>

						<span className="truncate">За день:</span>
						<div
							className={`flex items-center gap-1 text-xl font-medium truncate ${parseFloat(assetData.priceChange1d) < 0 ? 'text-main-red' : 'text-main-green'}`}
						>
							{assetData.priceChange1d}
							<span
								className={`flex h-2 w-2 truncate ${parseFloat(assetData.priceChange1d) < 0 ? 'triangle-down' : 'triangle-up'} `}
							></span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

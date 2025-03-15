import React from 'react';
import { calculateValueInCurrency } from '../../../utils';
import { useCurrency } from '../../../hooks';
import { CardIcon } from '../../../components/CardIcon';

export const TopRowCard = ({ assetData, flex, isAddButton, disabled, onClick }) => {
	const { isUSD, rubleCourse } = useCurrency();
	const priceInCurrency = calculateValueInCurrency(assetData.price, isUSD, rubleCourse);

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
		<section className={`flex flex-col py-3 px-3 ${flex} bg-sky-950/40 min-h-20 rounded-3xl`}>
			<div className="flex flex-col gap-2 items-start">
				<section className="flex gap-4 items-center justify-between w-full">
					<div
						className={`flex gap-3 items-center justify-start text-lg  font-medium truncate ${parseFloat(assetData.priceChange1h) < 0 ? 'text-main-red' : 'text-main-green'}`}
					>
						<CardIcon icon={assetData.icon} />
						<span className="text-lg font-medium truncate">{assetData.symbol}</span>
						{priceInCurrency}
					</div>
					<div
						className={`flex items-center gap-1 text-lg font-medium truncate ${parseFloat(assetData.priceChange1h) < 0 ? 'text-main-red' : 'text-main-green'}`}
					>
						<span
							className={`flex h-2 w-2 truncate ${parseFloat(assetData.priceChange1h) < 0 ? 'triangle-down' : 'triangle-up'} `}
						></span>
						{assetData.priceChange1h} %
					</div>
				</section>
				<section className="flex pl-1 gap-4 items-center  justify-between w-full">
					<div className="flex gap-2 items-center justify-between w-full">
						<div
							className={`flex items-center gap-1 text-md  font-medium truncate ${parseFloat(assetData.priceChange1w) < 0 ? 'text-main-red' : 'text-main-green'}`}
						>
							{' '}
							<span className="truncate text-md ">За неделю:</span>
							{assetData.priceChange1w} %
							<span
								className={`sm:flex hidden h-2 w-2 truncate ${parseFloat(assetData.priceChange1w) < 0 ? 'triangle-down' : 'triangle-up'} `}
							></span>
						</div>

						<div
							className={`flex items-center gap-1 text-md  font-medium truncate ${parseFloat(assetData.priceChange1d) < 0 ? 'text-main-red' : 'text-main-green'}`}
						>
							<span className="truncate text-md ">За день:</span>
							{assetData.priceChange1d} %
							<span
								className={`sm:flex hidden h-2 w-2 truncate ${parseFloat(assetData.priceChange1d) < 0 ? 'triangle-down' : 'triangle-up'} `}
							></span>
						</div>
					</div>
				</section>
			</div>
		</section>
	);
};

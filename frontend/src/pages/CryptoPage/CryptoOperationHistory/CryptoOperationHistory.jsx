import React from 'react';
import { OptionsButton } from '../../../components/buttons';
import { CardIcon } from '../../../components/CardIcon';
import { useSelector } from 'react-redux';
import { currencySelector, rubleCourseSelector } from '../../../store/selectors';
import { calculateValueInCurrency } from '../../../utils';

export const CryptoOperationHistory = ({
	coin,
	symbol,
	icon,
	price,
	operationType,
	operationAmount,
	assetAmount,
	accountName,
	operationDate,
}) => {
	const isUSD = useSelector(currencySelector);
	const rubleCourse = useSelector(rubleCourseSelector);

	const coinInCurrency = calculateValueInCurrency(Number(price), isUSD, rubleCourse);

	const isAddOperation = operationType === 'buy' ? 'text-main-green' : 'text-main-red';
	const isPlus = operationType === 'buy' ? '+ ' : '- ';
	const isMinus = operationType === 'buy' ? '- ' : '+ ';

	return (
		<section
			id="operations__history-item_container"
			className="flex justify-center items-start h-12 w-full text-sm border-b-1 border-white/40 gap-1"
		>
			<div className="flex flex-8 justify-center items-center gap-2">
				<CardIcon buttonSize={9} padding={'p-1'} size={5} icon={icon}></CardIcon>

				<div className="flex items-center justify-center w-full gap-1">
					<div className="flex flex-5 truncate">
						<p className={`text-sm w-full ${isAddOperation} truncate`}>
							{operationType === 'buy' ? 'BUY ' : 'SELL '}
							{coin}
						</p>
					</div>

					<div className="flex flex-3 truncate">
						<p className={`text-sm w-full truncate`}>{coinInCurrency}</p>
					</div>
					<div className="flex-4 truncate hidden lg:flex">
						<span
							className={`flex text-sm w-full truncate ${operationType === 'buy' ? 'text-main-red' : 'text-main-green'} gap-2`}
						>
							{isMinus}
							{operationAmount} {isUSD ? <span>{` ${accountName}`}</span> : ''}
						</span>
					</div>

					<div className="flex flex-4 truncate">
						<p className={`text-sm w-full text-slate-400 gap-2 truncate`}>
							{isPlus}
							{assetAmount} <span>{` ${symbol}`}</span>
						</p>
					</div>
					<div className="flex flex-3 text-center">
						<span className="text-sm w-full text-slate-400">{operationDate}</span>
					</div>
				</div>
			</div>
			<OptionsButton to={''} flex={'flex-[0.5]'} />
		</section>
	);
};

import React from 'react';
import { CardIcon, OptionsButton } from '../../../buttons';
import BancCardIcon from '../../../../assets/icons/income-debit-icon.svg';
import { calculateValueInCurrency } from '../../../../utils/calculateValueInCurrency';
import { useSelector } from 'react-redux';
import { currencySelector, rubleCourseSelector } from '../../../../store/selectors';

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

	const isAddOperation = operationType === 'buy' ? 'text-lime-200' : 'text-rose-300';
	const isPlus = operationType === 'buy' ? '+ ' : '- ';
	const isMinus = operationType === 'buy' ? '- ' : '+ ';

	return (
		<div
			id="operations__history-item_container"
			className="flex justify-center items-start h-12 w-full text-sm border-b-1 gap-2"
		>
			<div className="flex flex-10 justify-center items-center gap-2">
				<CardIcon buttonSize={9} padding={'p-1'} size={5} icon={icon}></CardIcon>

				<div className="flex items-center justify-center w-full gap-2">
					<div className="flex flex-3 truncate">
						<p className={`text-sm w-full ${isAddOperation} truncate`}>
							{operationType === 'buy' ? 'BUY ' : 'SELL '}
							{coin}
						</p>
					</div>

					<div className="flex flex-2 truncate">
						<p className={`text-sm w-full truncate`}>{coinInCurrency}</p>
					</div>
					<div className="flex-4 truncate hidden lg:flex">
						<span
							className={`flex text-sm w-full truncate ${operationType === 'buy' ? 'text-rose-300' : 'text-lime-200'} gap-2`}
						>
							{isMinus}
							{operationAmount} {isUSD ? <span>{` ${accountName}`}</span> : ''}
						</span>
					</div>
					{/* <div className="flex flex-3 truncate">
						<p className={`text-sm w-full ${isAddOperation} truncate`}>
							{isPlus}
							{` ${checkAmount}`} <span>{` "${accountName}"`}</span>
						</p>
					</div> */}
					<div className="flex flex-4 truncate">
						<p className={`text-sm w-full text-slate-400 gap-2 truncate`}>
							{isPlus}
							{assetAmount} <span>{` ${symbol}`}</span>
						</p>
					</div>
					<div className="flex flex-1">
						<span className="text-sm w-full text-slate-400">{operationDate}</span>
					</div>
				</div>
			</div>
			<OptionsButton to={''} flex={'flex-[0.5]'} />
		</div>
	);
};

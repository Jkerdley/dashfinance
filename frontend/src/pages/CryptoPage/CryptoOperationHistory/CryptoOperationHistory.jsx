import React from 'react';
import { OptionsButton } from '../../../components/buttons';
import { CardIcon } from '../../../components/CardIcon';
import { calculateValueInCurrency } from '../../../utils';
import { useCurrency } from '../../../hooks';

export const CryptoOperationHistory = ({
	coin,
	symbol,
	icon,
	price,
	operationType,
	operationAmount,
	assetAmount,
	exchangedAsset,
	operationDate,
}) => {
	const { isUSD, rubleCourse } = useCurrency();

	const coinInCurrency = calculateValueInCurrency(Number(price), isUSD, rubleCourse);

	const isPlus = operationType === 'buy' ? '+ ' : '- ';
	const isMinus = operationType === 'buy' ? '- ' : '+ ';

	return (
		<section
			id="operations__history-item_container"
			className="flex justify-center items-start h-12 lg:min-w-[30vw] min-w-[50vw] w-full text-sm border-b-1 border-white/40 gap-1"
		>
			<div className="flex flex-8 justify-center items-center gap-2">
				<CardIcon buttonSize={9} padding={'p-1'} size={5} icon={icon}></CardIcon>

				<div className="flex items-center justify-center w-full gap-1">
					<div className="flex flex-2/10 truncate flex-shrink-0 flex-grow">
						<span className={`text-sm w-full text-white truncate`}>
							<span className="flex">{operationType === 'buy' ? 'BUY ' : 'SELL '}</span>
							{coin}
						</span>
					</div>

					<div className="flex flex-2/10 truncate">
						<span className={`text-sm w-full truncate`}>{coinInCurrency}</span>
					</div>
					<div className="flex-2/10 truncate hidden lg:flex flex-shrink-0 flex-grow">
						<span
							className={`flex text-sm w-full truncate ${operationType === 'buy' ? 'text-main-red' : 'text-main-green'} gap-2`}
						>
							{isMinus}
							{operationAmount} {isUSD ? <span>{` ${exchangedAsset}`}</span> : ''}
						</span>
					</div>

					<div className="flex flex-2/10 truncate flex-shrink-0 flex-grow">
						<span
							className={`text-sm w-full ${operationType === 'buy' ? 'text-main-green' : 'text-main-red'} gap-2 truncate`}
						>
							{isPlus}
							{assetAmount} <span>{` ${symbol}`}</span>
						</span>
					</div>
					<div className="sm:flex hidden flex-shrink-0 flex-grow flex-1/10 text-start overflow-hidden">
						<span className="text-sm text-slate-400 truncate">
							{operationDate.split('-').reverse().join('.')}
						</span>
					</div>
				</div>
			</div>
			<OptionsButton to={''} flex={'flex-flex-1/10'} />
		</section>
	);
};

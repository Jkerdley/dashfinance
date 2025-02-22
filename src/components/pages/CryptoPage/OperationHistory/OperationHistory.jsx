import React from 'react';
import { CardIcon, OptionsButton } from '../../../buttons';
import BancCardIcon from '../../../../assets/icons/income-debit-icon.svg';

export const CryptoOperationHistory = ({
	category,
	operationType,
	operationComment,
	operationAmount,
	accountName,
	operationDate,
}) => {
	const isAddOperation = operationType === 'add' ? 'text-lime-200' : 'text-rose-300';
	const isPlus = operationType === 'add' ? '+' : '-';
	const isHaveComment = operationComment ? operationComment : category;
	return (
		<div
			id="operations__history-item_container"
			className="flex justify-center items-start h-12 w-full text-sm border-b-1 gap-2"
		>
			<div className="flex flex-12 justify-center items-center gap-2">
				<CardIcon buttonSize={9} padding={'p-1.5'} size={5} icon={BancCardIcon}></CardIcon>

				<div className="flex items-center justify-center w-full gap-2">
					<div className="flex flex-4 truncate">
						<p className={`text-sm w-full ${isAddOperation} truncate`}>{isHaveComment}</p>
					</div>
					<div className="flex flex-2 truncate">
						<p className={`text-sm w-full ${isAddOperation} truncate`}>
							{isPlus}
							{operationAmount}
						</p>
					</div>
					<div className="flex-3 truncate hidden lg:flex">
						<p className="text-sm w-full truncate text-slate-400">{accountName}</p>
					</div>
					<div className="flex flex-1">
						<p className="text-sm w-full text-slate-400">{operationDate}</p>
					</div>
				</div>
			</div>
			<OptionsButton to={''} flex={'flex-[0.5]'} />
		</div>
	);
};

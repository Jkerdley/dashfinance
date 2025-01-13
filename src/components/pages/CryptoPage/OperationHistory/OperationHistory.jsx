import React from 'react';
import { CardIcon } from '../../../buttons';
import Settings from '../../../../assets/icons/settings-icon.svg';
import BancCardIcon from '../../../../assets/icons/income-debit-icon.svg';

export const OperationHistory = ({
	category,
	operationType,
	operationComment,
	operationAmount,
	accountName,
	operationDate,
}) => {
	const isAddOperation = operationType === 'add' ? 'text-lime-300' : 'text-rose-300';
	const isPlus = operationType === 'add' ? '+' : '-';
	const isHaveComment = operationComment ? operationComment : category;
	return (
		<div className="flex justify-center items-start h-10 w-[100%] mt-3 text-sm border-b-2">
			<div className="flex flex-[12] justify-center items-center mr-3 gap-2">
				<CardIcon buttonSize={9} padding={'p-1'} size={5} icon={BancCardIcon}></CardIcon>

				<div className="flex items-center justify-center w-[100%] gap-2 ">
					<div className="flex flex-[4] truncate">
						<p className={`text-sm w-[100%] ${isAddOperation} truncate`}>{isHaveComment}</p>
					</div>
					<div className="flex flex-[2] truncate">
						<p className={`text-sm w-[100%] ${isAddOperation} truncate`}>
							{isPlus}
							{operationAmount}
						</p>
					</div>
					<div className="flex flex-[3] truncate">
						<p className="text-sm w-[100] truncate text-slate-400">{accountName}</p>
					</div>
					<div className="flex flex-[1]">
						<p className="text-sm w-[100%] text-slate-400">{operationDate}</p>
					</div>
				</div>
			</div>
			<div className="flex w-7 h-7 flex-[0.5] justify-center">
				<CardIcon size={5} icon={Settings} noBackground={true}></CardIcon>
			</div>
		</div>
	);
};

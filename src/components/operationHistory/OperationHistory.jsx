import React from 'react';
import { CardIcon } from '../buttons/CardIcon';
import Settings from '../../assets/icons/settings-icon.svg';
import BancCardIcon from '../../assets/icons/income-cash-icon.svg';

export const OperationHistory = ({
	addOperation,
	operationType,
	operationComment,
	summOfOperation,
	accountName,
	operationDate,
}) => {
	const isAddOperation = addOperation ? 'text-lime-300' : 'text-rose-300';
	const isPlus = addOperation ? '+' : '-';
	const isHaveComment = operationComment ? operationComment : operationType;
	return (
		<div className="flex justify-center  bg-white items-center h-10 w-[100%] mt-3 text-sm border-b-2">
			<div className="flex flex-[12] items-center gap-2">
				<CardIcon buttonSize={8} size={5} icon={BancCardIcon}></CardIcon>
				<div className="flex items-center justify-between w-[100%] gap-2 ">
					<div className="flex flex-[4] truncate bg-red-600">
						<p className={`text-sm w-[100%] ${isAddOperation} truncate`}>{isHaveComment}</p>
					</div>
					<div className="flex flex-[2] truncate bg-gray-600">
						<p className={`text-sm w-[100%] ${isAddOperation} truncate`}>
							{isPlus}
							{summOfOperation}
						</p>
					</div>
					<div className="flex flex-[3] truncate bg-blue-600">
						<p className="text-sm w-[100] truncate text-slate-400">{accountName}</p>
					</div>
					<div className="flex flex-[1] bg-red-600">
						<p className="text-sm w-[100%] text-slate-400">{operationDate}</p>
					</div>
				</div>
			</div>
			<div className="flex w-7 h-7 flex-[0.5] justify-center items-center">
				<CardIcon size={5} icon={Settings} noBackground={true}></CardIcon>
			</div>
		</div>
	);
};

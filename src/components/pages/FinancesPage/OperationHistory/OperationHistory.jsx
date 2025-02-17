import React from 'react';
import { CardIcon } from '../../../buttons';
import Settings from '../../../../assets/icons/settings-icon.svg';
import BancCardIcon from '../../../../assets/icons/income-debit-icon.svg';
import { EditButton } from '../../../buttons/EditButton';

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
					<div className="flex flex-3 truncate">
						<p className="text-sm w-full truncate text-slate-400">{accountName}</p>
					</div>
					<div className="flex flex-1">
						<p className="text-sm w-full text-slate-400">{operationDate}</p>
					</div>
				</div>
			</div>
			<div className="flex w-9 h-9 flex-0.5 justify-center">
				<EditButton to={''} size={5} icon={Settings}></EditButton>
			</div>
		</div>
	);
};

import React from 'react';
import { CardIcon } from '../../components/buttons';
import BancCardIcon from '../../assets/icons/bank-icon.svg';

export const OperationItemInModal = ({
	category,
	operationType,
	operationComment,
	operationAmount,
	accountName,
	operationDate,
}) => {
	const isAddOperation = operationType === 'add' ? 'text-lime-200' : 'text-rose-200';
	const isPlus = operationType === 'add' ? '+' : '-';
	const isHaveComment = operationComment ? operationComment : category;

	return (
		<section
			id="operations__history-item_container"
			className="flex justify-center items-start h-12 w-full text-sm border-b-1 gap-2"
		>
			<div className="flex flex-12 justify-center items-center gap-2">
				<CardIcon buttonSize={9} padding={'p-1.5'} size={5} icon={BancCardIcon}></CardIcon>

				<div className="flex items-center justify-center w-full gap-2">
					<div className="flex flex-4 truncate">
						<span className={`text-sm w-full ${isAddOperation} truncate`}>{isHaveComment}</span>
					</div>
					<div className="flex flex-4 truncate">
						<span className={`text-sm w-full ${isAddOperation} truncate`}>{isPlus}</span>
						<input
							name="operation-amount"
							className="text-sm w-full text-slate-400"
							placeholder="Количество"
						></input>
					</div>
					<div className="flex-1 truncate hidden lg:flex">
						<p className="text-sm w-full truncate text-slate-400">{accountName}</p>
					</div>
					<div className="flex flex-4">
						<input
							name="operation-date"
							className="text-sm w-full text-slate-400"
							placeholder="Введите дату операции"
						>
							{operationDate}
						</input>
					</div>
				</div>
			</div>
		</section>
	);
};

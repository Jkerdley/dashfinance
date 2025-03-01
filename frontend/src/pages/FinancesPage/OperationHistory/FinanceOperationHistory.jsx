import React from 'react';

import BancCardIcon from '../../../assets/icons/income-debit-icon.svg';
import { CardIcon } from '../../../components/CardIcon';
import { OptionsButton } from '../../../components/buttons';

const FinanceOperationHistoryComponent = ({
	category,
	operationType,
	operationComment,
	operationAmount,
	accountName,
	operationDate,
}) => {
	const isAddOperation = operationType === 'add' ? 'text-main-green' : 'text-main-red';
	const isPlus = operationType === 'add' ? '+' : '-';

	return (
		<section
			id="operations__history-item_container"
			className="flex justify-center items-start h-16 w-full pt-3 text-sm border-b-1 border-white/40"
		>
			<div className="flex flex-10 justify-center items-center gap-2">
				<CardIcon buttonSize={9} padding={'p-1.5'} size={5} icon={BancCardIcon}></CardIcon>
				<div className="flex items-center justify-center w-full gap-2">
					<div className="flex flex-3 truncate">
						<p className={`text-sm w-full text-white truncate`}>{category}</p>
					</div>
					{/* <div className="flex-4 hidden 3xl:flex truncate">
						<p className={`text-sm w-full ${isAddOperation} truncate`}>{operationComment}</p>
					</div> */}
					<div className="flex flex-3 truncate">
						<p className={`text-sm w-full ${isAddOperation} truncate`}>
							{isPlus}
							{operationAmount}
						</p>
					</div>
					<div className=" lg:flex hidden flex-3 truncate">
						<p className="text-sm w-full truncate text-slate-400 ">{accountName}</p>
					</div>
					<div className="flex flex-3 text-center">
						<p className="text-sm w-full text-slate-400">{operationDate}</p>
					</div>
				</div>
			</div>
			<OptionsButton to={''} flex={'flex-[0.5]'} />
		</section>
	);
};

export const FinanceOperationHistory = React.memo(FinanceOperationHistoryComponent);

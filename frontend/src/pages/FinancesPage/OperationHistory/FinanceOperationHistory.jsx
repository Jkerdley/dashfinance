// import React from 'react';

// import BancCardIcon from '../../../assets/icons/income-debit-icon.svg';
// import { CardIcon } from '../../../components/CardIcon';
// import { OptionsButton } from '../../../components/buttons';

// const FinanceOperationHistoryComponent = ({
// 	category,
// 	operationType,
// 	operationComment,
// 	operationAmount,
// 	accountName,
// 	operationDate,
// }) => {
// 	const isAddOperation = operationType === 'add' ? 'text-main-green' : 'text-main-red';
// 	const isPlus = operationType === 'add' ? '+' : '-';

// 	return (
// 		<section
// 			id="operations__history-item_container"
// 			className="flex justify-center items-start h-16 w-full pt-3 text-sm border-b-1 border-white/40 bg-violet-500 overflow-x-hidden"
// 		>
// 			<div className="flex flex-10 justify-center items-center gap-2 bg-amber-500">
// 				<CardIcon buttonSize={9} padding={'p-1.5'} size={5} icon={BancCardIcon}></CardIcon>
// 				<div className="flex items-center justify-center w-full ga">
// 					<div className="flex flex-3 truncate bg-cyan-500">
// 						<span className={`text-sm w-full text-white truncate`}>{category}</span>
// 					</div>
// 					{/* <div className="flex-4 hidden 3xl:flex truncate">
// 						<p className={`text-sm w-full ${isAddOperation} truncate`}>{operationComment}</p>
// 					</div> */}
// 					<div className="flex flex-3 truncate bg-amber-900">
// 						<span className={`text-sm w-full ${isAddOperation} truncate`}>
// 							{isPlus}
// 							{operationAmount}
// 						</span>
// 					</div>
// 					<div id='accountName' className=" lg:flex hidden flex-3 truncate bg-amber-200">
// 						<span className="text-sm w-full truncate text-slate-400 ">{accountName}</span>
// 					</div>
// 					<div  className="flex flex-3 text-center bg-cyan-900">
// 						<span className="text-sm w-full text-slate-400">{operationDate}</span>
// 					</div>
// 				</div>
// 			</div>
// 			<OptionsButton to={''} flex={'flex-[0.5]'} />
// 		</section>
// 	);
// };

// export const FinanceOperationHistory = React.memo(FinanceOperationHistoryComponent);

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
			className="flex justify-between items-start h-16 w-full pt-3 text-sm border-b-1 border-white/40 overflow-hidden"
		>
			<div className="flex flex-grow items-center gap-2 max-w-full overflow-hidden">
				<CardIcon buttonSize={9} padding={'p-1.5'} size={5} icon={BancCardIcon}></CardIcon>
				<div className="flex items-center w-full gap-2 overflow-hidden">
					<div className="flex-shrink-0 flex-grow w-1/4">
						<span className="text-sm text-white truncate block">{category}</span>
					</div>
					<div className="flex-shrink-0 flex-grow w-1/4">
						<span className={`text-sm ${isAddOperation} truncate block`}>
							{isPlus}
							{operationAmount}
						</span>
					</div>
					<div id="accountName" className="lg:block hidden flex-shrink-0 flex-grow w-1/4">
						<span className="text-sm text-slate-400 truncate block">{accountName}</span>
					</div>
					<div className="flex-shrink-0 flex-grow w-1/4 text-start">
						<span className="text-sm text-slate-400 truncate block ">{operationDate}</span>
					</div>
				</div>
			</div>
			<OptionsButton to={''} flex={'flex-shrink-0'} />
		</section>
	);
};

export const FinanceOperationHistory = React.memo(FinanceOperationHistoryComponent);

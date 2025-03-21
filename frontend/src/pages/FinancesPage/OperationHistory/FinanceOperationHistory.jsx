import React, { memo } from 'react';

import BancCardIcon from '../../../assets/icons/income-debit-icon.svg';
import { CardIcon } from '../../../components/CardIcon';
import { OptionsButton } from '../../../components/buttons';
import { useDispatch } from 'react-redux';
import { request } from '../../../utils';
import { fetchAccounts, fetchHistory } from '../../../store/actions/async';

export const FinanceOperationHistory = memo(
	({ id, category, operationType, operationComment, operationAmount, accountName, operationDate }) => {
		const isAddOperation = operationType === 'add' ? 'text-main-green' : 'text-main-red';
		const isPlus = operationType === 'add' ? '+' : '-';
		const dispatch = useDispatch();

		const handleDeleteHistoryItem = async () => {
			if (confirm('Удалить эту операцию?')) {
				await request(`/history/${id}`, 'DELETE');
				dispatch(fetchHistory());
				dispatch(fetchAccounts());
			}
		};

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
						<div className="sm:flex hidden flex-shrink-0 flex-grow w-1/4 text-start">
							<span className="text-sm text-slate-400 truncate block ">
								{operationDate.split('-').reverse().join('.')}
							</span>
						</div>
					</div>
				</div>
				<OptionsButton deleteIcon={true} onClick={handleDeleteHistoryItem} flex={'flex-shrink-0'} />
			</section>
		);
	},
);
FinanceOperationHistory.displayName = 'FinanceOperationHistory';

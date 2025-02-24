import React from 'react';
import EditIcon from '../../../../assets/icons/edit-icon.svg';
import { OperationHistory } from './OperationHistory';
import { accounts, history } from '../../../../db.js';
import OutlineButton from '../../../buttons/OutlineButton.jsx';
import { getHIstoryInCurrency } from '../../../../utils/getHIstoryInCurrency.js';

export const OpreationsHistoryLayout = ({ isUSD, rubleCourse }) => {
	const findAccountName = (accountId) => {
		const account = accounts.find((accountItem) => accountId === accountItem.id);
		return account ? account.name : null;
	};

	const filteredHistory = getHIstoryInCurrency(history, isUSD, rubleCourse).filter(
		(operation) => operation.tag === 'finance',
	);

	return (
		<div
			id="accouts__operations-history-container"
			className="flex flex-col flex-5 p-4 rounded-3xl bg-sky-950/40 gap-4"
		>
			<div className="flex justify-between gap-2">
				<span className=" text-2xl font-medium">История операций</span>
				<OutlineButton to={''} disabled={false} icon={EditIcon} alt="change history">
					<span className="text-base">Изменить</span>
				</OutlineButton>
			</div>
			<div
				id="operationsHistoryBoxWrapper"
				className="flex flex-col max-h-[56vh] gap-3 rounded-2xl pr-1 pt-1 overflow-y-auto overscroll-auto scroll-smooth scrollbar"
			>
				{filteredHistory.map((operation) => {
					return (
						<div key={operation.id}>
							<OperationHistory
								operationType={operation.type}
								category={operation.category}
								operationComment={operation.comment}
								operationAmount={operation.amount}
								accountName={findAccountName(operation.account_id)}
								operationDate={operation.date}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

import React from 'react';
import EditIcon from '../../../../assets/icons/edit-icon.svg';
import { OperationHistory } from './OperationHistory';
import { accounts, operations } from '../../../../db.js';
import { calculateValueInCurrency } from '../../../../utils/calculateValueInCurrency.js';
import OutlineButton from '../../../buttons/OutlineButton.jsx';

export const OpreationsHistoryLayout = ({ isUSD, rubleCourse }) => {
	const findAccountName = (accountId) => {
		const account = accounts.find((accountItem) => accountId === accountItem.id);
		return account ? account.name : null;
	};

	const operationsInCurrency = operations.map((operation) => ({
		...operation,
		amount: calculateValueInCurrency(operation.amount, isUSD, rubleCourse),
	}));
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
				{operationsInCurrency.map((operation) => {
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

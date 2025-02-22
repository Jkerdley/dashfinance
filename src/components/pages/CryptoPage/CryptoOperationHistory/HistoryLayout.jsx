import React from 'react';
import { CryptoOperationHistory } from './CryptoOperationHistory';

export const HistoryLayout = ({ operationsInCurrency, accounts }) => {
	const findAccountName = (accountId) => {
		const account = accounts.find((accountItem) => accountId === accountItem.id);
		return account ? account.name : null;
	};
	return (
		<div
			id="operationsHistoryBoxWrapper"
			className="flex flex-col max-h-[56vh] gap-3 rounded-2xl pr-1 pt-1 overflow-y-auto overscroll-auto scroll-smooth scrollbar"
		>
			{operationsInCurrency.map((operation) => {
				return (
					<div key={operation.id}>
						<CryptoOperationHistory
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
	);
};

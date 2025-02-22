import React from 'react';
import { TopTenCoinContainer } from './TopTenCoinContainer.jsx';
import { accounts } from '../../../../db.js';
import { calculateValueInCurrency } from '../../../../utils/calculateValueInCurrency.js';
import { AddAndDeleteButton } from '../../../buttons/AddAndDeleteButton.jsx';
import { OperationsPanel } from '../../../OperationsPanelButtons/OperationsPanel.jsx';

export const TopTenLayout = ({ isUSD, rubleCourse }) => {
	const accountsInCurrency = accounts.map((account) => ({
		...account,
		balance: calculateValueInCurrency(account.balance, isUSD, rubleCourse),
	}));

	return (
		<section
			id="accouts__main__container"
			className="flex flex-col flex-8 p-4 rounded-3xl bg-sky-950/40 gap-0.5 snap-start"
		>
			<div id="accouts__header-and-button" className="flex gap-2 mb-1 justify-between">
				<span className="text-2xl font-medium">Топ 10</span>
				<AddAndDeleteButton to={''} alt={'finance accounts'} />
			</div>

			<div
				id="accouts__wrapper"
				className="flex flex-col pr-1 mb-3 max-h-[47vh] rounded-[18px] overflow-y-auto overscroll-auto scrollbar"
			>
				{accountsInCurrency.map((account) => {
					return (
						<div key={account.id}>
							<TopTenCoinContainer
								accountName={account.name}
								accountBalance={account.balance}
								icon={account.icon}
							/>
						</div>
					);
				})}
			</div>
			<OperationsPanel onClick={''} />
		</section>
	);
};

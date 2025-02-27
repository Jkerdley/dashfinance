import React from 'react';
import AddIcon from '../../../../assets/icons/add-icon.svg';
import { FinanceAccount } from './FinanceAccount';
import { accounts } from '../../../../db.js';
import { calculateValueInCurrency } from '../../../../utils/calculateValueInCurrency.js';
import { EditAddDeleteButton } from '../../../buttons/EditAddDeleteButton.jsx';
import { SectionContainerHeader } from '../../../SectionContainerHeader/SectionContainerHeader.jsx';

export const AccountsLayout = ({ isUSD, rubleCourse }) => {
	const accountsInCurrency = accounts.map((account) => ({
		...account,
		balance: calculateValueInCurrency(account.balance, isUSD, rubleCourse),
	}));

	return (
		<section
			id="accouts__main__container"
			className="flex flex-col flex-8 p-4 rounded-3xl bg-sky-950/40 gap-0.5 snap-start"
		>
			<div id="accouts__header-and-button" className="flex gap-2 justify-between">
				<SectionContainerHeader title={'Счета'} />
				<EditAddDeleteButton
					icon={AddIcon}
					to={''}
					title={'Добавить/Удалить'}
					alt={'Финансовые счета'}
				/>
			</div>
			<div
				id="accouts__wrapper"
				className="flex flex-col pr-1 mt-1 max-h-[47vh] rounded-[18px] overflow-y-auto overscroll-auto scrollbar"
			>
				{accountsInCurrency.map((account) => {
					return (
						<div key={account.id} className="mt-4">
							<FinanceAccount
								accountName={account.name}
								accountBalance={account.balance}
								icon={account.icon}
							/>
						</div>
					);
				})}
			</div>
		</section>
	);
};

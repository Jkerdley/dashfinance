import React from 'react';
import AddIcon from '../../../assets/icons/add-icon.svg';
import { FinanceAccount } from './FinanceAccount.jsx';
import { EditAddDeleteButton } from '../../../components/buttons/EditAddDeleteButton.jsx';
import { SectionContainerHeader } from '../../../components/SectionContainerHeader/SectionContainerHeader.jsx';
import { useFetchAccountsInCurrency } from '../../../hooks/useFetchAccountsInCurrency.js';
import { Loader } from '../../../components/Loaders/Loader.jsx';

export const AccountsContainer = () => {
	const { accountsInCurrency, isLoading } = useFetchAccountsInCurrency();

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
			{isLoading ? (
				<Loader />
			) : accountsInCurrency.length === 0 ? (
				<span className="flex items-center justify-center mt-20 ">Добавьте счета</span>
			) : (
				<div
					id="accouts__wrapper"
					className="flex flex-col pr-1 mt-1 max-h-[45vh] rounded-[18px] overflow-y-auto overscroll-auto scrollbar"
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
			)}
		</section>
	);
};
export const AccountsLayout = React.memo(AccountsContainer);

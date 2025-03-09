import React from 'react';
import AddIcon from '../../../assets/icons/add-icon.svg';
import { FinanceAccount } from './FinanceAccount.jsx';
import { EditAddDeleteButton } from '../../../components/buttons/EditAddDeleteButton.jsx';
import { SectionContainerHeader } from '../../../components/SectionContainerHeader/SectionContainerHeader.jsx';
import { useFetchAccountsInCurrency } from '../../../hooks/useFetchAccountsInCurrency.js';
import { Loader } from '../../../components/Loaders/Loader.jsx';
import {
	selectAddAccountModal,
	selectUpdateAccountModal,
} from '../../../store/selectors/select-modal-selectors.js';
import { AddAccountModal } from '../../../components/modalWindow/AddAccountModal.jsx';
import {
	closeAddAccountModal,
	closeUpdateAccountModal,
	openAddAccountModal,
} from '../../../store/actions/modalActions.js';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateAccountModal } from '../../../components/modalWindow/UpdateAccountModal.jsx';

export const AccountsContainer = () => {
	const { accountsInCurrency, isLoading } = useFetchAccountsInCurrency();
	const dispatch = useDispatch();
	const addAccountModal = useSelector(selectAddAccountModal);
	const updateAccountModal = useSelector(selectUpdateAccountModal);

	return (
		<section
			id="accouts__main__container"
			className="flex flex-col flex-8 p-4 rounded-3xl bg-sky-950/40 gap-0.5 snap-start"
		>
			<div id="accouts__header-and-button" className="flex gap-2 justify-between">
				<SectionContainerHeader title={'Счета'} />
				<EditAddDeleteButton
					icon={AddIcon}
					onClick={() => dispatch(openAddAccountModal())}
					title={'Добавить'}
					alt={'Финансовые счета'}
				/>
			</div>
			{addAccountModal.isOpen && (
				<AddAccountModal
					isOpen={addAccountModal.isOpen}
					onClose={() => dispatch(closeAddAccountModal())}
				/>
			)}
			{updateAccountModal.isOpen && (
				<UpdateAccountModal
					accountsInCurrency={accountsInCurrency}
					accountId={updateAccountModal.accountIdForUpdate}
					isOpen={updateAccountModal.isOpen}
					onClose={() => dispatch(closeUpdateAccountModal())}
				/>
			)}
			{isLoading ? (
				<Loader />
			) : accountsInCurrency.length === 0 ? (
				<span className="flex items-center justify-center mt-20 ">Добавьте счета</span>
			) : (
				<div
					id="accouts__wrapper"
					className="flex flex-col pr-1 mt-1 max-h-[35vh] rounded-[18px] overflow-y-auto overscroll-auto scrollbar"
				>
					{accountsInCurrency.map((account) => {
						return (
							<div key={account.id} className="mt-4">
								<FinanceAccount
									id={account.id}
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

import React from 'react';
import SettingsIcon from '../../../assets/icons/settings-icon.svg';
import { WideOperationsButton } from '../../buttons/WideOperationsButton';
import { FinanceAccount } from './FinanceAccount';
import OutlineButton from '../../buttons/OutlineButton';
import { OperationHistory } from './OperationHistory';
import { Categorie } from './Categories';
import { accounts, categories, operations } from '../../../db';
import { FinanceResult } from './FinanceResult';

export const FinancesLayout = () => {
	const findAccountName = (accountId) => {
		const account = accounts.find((accountItem) => accountId === accountItem.id);
		return account ? account.name : null;
	};

	return (
		<>
			<div id="layout__finances" className="flex flex-16 flex-wrap rounded-4xl gap-4">
				<div className="flex flex-8 flex-col gap-4">
					<div
						id="col__finance-result"
						className="flex flex-col flex-4 gap-2 p-4 rounded-3xl bg-[rgba(13,43,71,0.55)]"
					>
						<div className="flex justify-between gap-2">
							<p className="font-medium text-2xl">Финансовый результат</p>
						</div>

						<FinanceResult moneyToggle={'rub'} />
					</div>
					<div id="row__accounts-and-history" className="flex flex-10 gap-4">
						<div id="operations__and_accounts-wrapper" className="flex flex-col flex-2 gap-4">
							<div
								id="operations__container"
								className="flex flex-col flex-1 text-2xl p-4 rounded-[26px] bg-[rgba(13,43,71,0.55)]"
							>
								<div id="operations__buttons" className="flex flex-col gap-4">
									<p className=" font-medium">Операции</p>
									<div className="flex gap-4 w-full justify-between items-center">
										<WideOperationsButton color={'bg-[#b9ff80]'} alt="income">
											<p className="text-lg font-semibold">Доходы +</p>
										</WideOperationsButton>
										<WideOperationsButton color={'bg-[#ff81b6]'} alt="income">
											<p className="text-lg font-semibold">Расходы - </p>
										</WideOperationsButton>
									</div>
								</div>
							</div>
							<section
								id="accouts__main__container"
								className="flex flex-col flex-8 text-2xl p-4 rounded-3xl bg-[rgba(13,43,71,0.55)] gap-0.5 snap-start"
							>
								<div
									id="accouts__header-and-button"
									className="flex font-medium gap-2 justify-between"
								>
									Счета
									<OutlineButton
										to={''}
										disabled={false}
										icon={SettingsIcon}
										alt="finance accounts"
									>
										<p className="text-base">Изменить</p>
									</OutlineButton>
								</div>
								<div
									id="accouts__wrapper"
									className="flex flex-col pr-1 mt-1 max-h-[47vh] rounded-[18px] overflow-y-auto overscroll-auto scrollbar"
								>
									{accounts.map((account) => {
										return (
											<div key={account.id}>
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
						</div>
						<div
							id="accouts__operations-container"
							className="flex flex-col flex-5 text-2xl p-4 rounded-3xl bg-[rgba(13,43,71,0.55)] gap-4"
						>
							<div className="flex font-medium justify-between gap-2">
								История операций
								<OutlineButton
									to={''}
									disabled={false}
									icon={SettingsIcon}
									alt="change history"
								>
									<p className="text-base">Изменить</p>
								</OutlineButton>
							</div>
							<div
								id="operationsHistoryBoxWrapper"
								className="flex flex-col max-h-[56vh] gap-3 rounded-2xl pr-1 pt-1 overflow-y-auto overscroll-auto scroll-smooth scrollbar"
							>
								{operations.map((operation) => {
									console.log('operation.account_id', operation.account_id);
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
					</div>
				</div>

				<div className="flex flex-6 flex-col gap-4">
					<div
						id="column__categories"
						className="flex flex-col flex-2 p-4 rounded-3xl bg-[rgba(13,43,71,0.55)]"
					>
						<div id="categories__title-and-buitton" className="flex justify-between gap-2 mb-2">
							<span className="flex text-2xl font-medium mb-2">Категории расходов</span>
							<OutlineButton
								to={''}
								disabled={false}
								icon={SettingsIcon}
								alt="finance accounts"
							>
								<p className="text-base">Изменить</p>
							</OutlineButton>
						</div>
						<div
							id="spend-categories__container"
							className="flex flex-4 flex-wrap gap-4 pr-2 justify-between max-h-[35vh] w-full rounded-[16px] overflow-y-auto overscroll-auto scroll-smooth scrollbar"
						>
							{categories.map((categorie) => {
								return (
									<Categorie
										key={categorie.id}
										budget={categorie.budget}
										balance={categorie.balance}
										categorie={categorie.name}
										icon={categorie.icon}
									/>
								);
							})}
						</div>
					</div>
					<div
						id="column__income-chart"
						className="flex flex-8 p-4 rounded-3xl bg-[rgba(13,43,71,0.55)]"
					>
						<p className="text-2xl font-medium">Доходы график</p>
					</div>
				</div>
			</div>
		</>
	);
};

// flex-8 m:flex-6 sm:flex-2

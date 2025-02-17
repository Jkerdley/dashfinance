import React from 'react';
import SettingsIcon from '../../../assets/icons/settings-icon.svg';
import { WideOperationsButton } from '../../buttons/WideOperationsButton';
import { FinanceAccount } from './FinanceAccount';
import OutlineButton from '../../buttons/OutlineButton';
import { OperationHistory } from './OperationHistory';
import { Categorie } from './Categories';

let operations = [
	{
		id: '822e',
		category: 'Продукты',
		account_id: '0001',
		icon: 'products',
		type: 'spend',
		amount: 10234.23,
		date: '12.02.2025',
		comment: 'Сметана, молоко, сыр косичка',
	},
	{
		id: '813e',
		category: 'Продукты',
		account_id: '0001',
		icon: 'products',
		type: 'spend',
		amount: 21234.23,
		date: '11.12.2025',
		comment: '',
	},
	{
		id: '812e',
		category: 'Продукты',
		account_id: '0001',
		icon: 'products',
		type: 'spend',
		amount: 13234.23,
		date: '16.01.2025',
		comment: '',
	},
	{
		id: '821e',
		category: 'БытХим',
		account_id: '0006',
		icon: 'house',
		type: 'spend',
		amount: 4234.23,
		date: '15.01.2025',
		comment: '',
	},
	{
		id: '823e',
		category: 'Зарплата',
		account_id: '0005',
		icon: 'cash',
		type: 'add',
		amount: 120234.45,
		date: '13.01.2025',
		comment: 'Халтурка',
	},
	{
		id: '824e',
		category: 'ЖКХ',
		account_id: '0007',
		icon: 'house',
		type: 'spend',
		amount: 20234.23,
		date: '22.01.2025',
		comment: '',
	},
	{
		id: '825e',
		category: 'Инвестиции',
		account_id: '0008',
		icon: 'investments',
		type: 'add',
		amount: 312234.12,
		date: '12.01.2025',
		comment: '',
	},
	{
		id: '826e',
		category: 'Продукты',
		account_id: '0009',
		icon: 'products',
		type: 'add',
		amount: 20234.23,
		date: '02.01.2025',
		comment: '',
	},
	{
		id: '843e',
		category: 'Продукты',
		account_id: '0010',
		icon: 'products',
		type: 'add',
		amount: 20234.23,
		date: '02.01.2025',
		comment: '',
	},
	{
		id: '823e',
		category: 'Продукты',
		account_id: '0001',
		icon: 'products',
		type: 'add',
		amount: 20234.23,
		date: '02.01.2025',
		comment: '',
	},
	{
		id: '813e',
		category: 'Продукты',
		account_id: '0001',
		icon: 'products',
		type: 'add',
		amount: 20234.23,
		date: '02.01.2025',
		comment: '',
	},
	{
		id: '896e',
		category: 'Продукты',
		account_id: '0001',
		icon: 'products',
		type: 'add',
		amount: 20234.23,
		date: '02.01.2025',
		comment: '',
	},
	{
		id: '886e',
		category: 'Продукты',
		account_id: '0001',
		icon: 'products',
		type: 'add',
		amount: 20234.23,
		date: '02.01.2025',
		comment: '',
	},
	{
		id: '876e',
		category: 'Продукты',
		account_id: '0001',
		icon: 'products',
		type: 'add',
		amount: 20234.23,
		date: '02.01.2025',
		comment: '',
	},
	{
		id: '866e',
		category: 'Продукты',
		account_id: '0001',
		icon: 'products',
		type: 'add',
		amount: 20234.23,
		date: '02.01.2025',
		comment: '',
	},
	{
		id: '856e',
		category: 'Продукты',
		account_id: '0001',
		icon: 'products',
		type: 'add',
		amount: 20234.23,
		date: '02.01.2025',
		comment: '',
	},
	{
		id: '846e',
		category: 'Продукты',
		account_id: '0001',
		icon: 'products',
		type: 'add',
		amount: 20234.23,
		date: '02.01.2025',
		comment: '',
	},
	{
		id: '836e',
		category: 'Продукты',
		account_id: '0001',
		icon: 'products',
		type: 'add',
		amount: 20234.23,
		date: '02.01.2025',
		comment: '',
	},
	{
		id: '826e',
		category: 'Продукты',
		account_id: '0001',
		icon: 'products',
		type: 'add',
		amount: 20234.23,
		date: '02.01.2025',
		comment: '',
	},
	{
		id: '816e',
		category: 'Продукты',
		account_id: '0001',
		icon: 'products',
		type: 'add',
		amount: 20234.23,
		date: '02.01.2025',
		comment: '',
	},
];

let categories = [
	{ id: '0124', name: 'Продукты', budget: '50000', balance: '22134.12', icon: 'credit' },
	{ id: '0125', name: 'БытХим', budget: '10000', balance: '12134.12', icon: 'debit' },
	{ id: '0126', name: 'ЖКХ', budget: '5000', balance: '5300', icon: 'debit' },
	{ id: '0127', name: 'Развлечения', budget: '50000', balance: '22134.12', icon: 'debit' },
	{ id: '0128', name: 'Семья', budget: '50000', balance: '22134.12', icon: 'debit' },
	{ id: '0130', name: 'Вредные привычки', budget: '50000', balance: '22134.12', icon: 'debit' },
	{ id: '0131', name: 'Кафе', budget: '50000', balance: '22134.12', icon: 'debit' },
	{ id: '0132', name: 'Досуг', budget: '10000', balance: '11000', icon: 'debit' },
	{ id: '0133', name: 'Подарки', budget: '', balance: '17004.81', icon: 'debit' },
	{ id: '0134', name: 'Путешествия', budget: '23500', balance: '1004.81', icon: 'gift' },
];
const findAccountName = (accountId) => {
	const account = accounts.find((accountItem) => accountId === accountItem.id);
	return account ? account.name : null;
};
let accounts = [
	{ id: '0001', name: 'SBER Bank VISA', balance: '36000,12', icon: 'credit', type: 'debit' },
	{ id: '0002', name: 'Tinkoff VISA credit card', balance: '50000', icon: 'credit', type: 'credit' },
	{ id: '0003', name: 'Наличные', balance: '552000', icon: 'cash', type: 'cash' },
	{ id: '0004', name: 'Alfa Bank debit', balance: '50000', icon: 'debit', type: 'debit' },
	{
		id: '0005',
		name: 'Tinkoff black MasterCard debit card',
		balance: '50000',
		icon: 'debit',
		type: 'debit',
	},
	{ id: '0006', name: 'Alfa bank debit', balance: '50000', icon: 'debit', type: 'debit' },
	{ id: '0007', name: 'Tinkoff platinum credit', balance: '1513000,72', icon: 'credit', type: 'credit' },
	{ id: '0008', name: 'Alfa Bank credit', balance: '50000', icon: 'credit', type: 'credit' },
	{ id: '0009', name: 'SBER Bank MIR', balance: '3214000', icon: 'debit', type: 'debit' },
	{ id: '0010', name: 'Gift Card', balance: '50000', icon: 'gift', type: 'debit' },
];
export const FinancesLayout = () => {
	return (
		<>
			<div id="layout__finances" className="flex flex-16 flex-wrap rounded-4xl gap-4">
				<div className="flex flex-8 flex-col gap-4">
					<div
						id="col__finance-result"
						className="flex flex-col flex-4 p-4 rounded-3xl bg-[rgba(13,43,71,0.55)]"
					>
						<p className="font-medium text-2xl">Финансовый результат</p>
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

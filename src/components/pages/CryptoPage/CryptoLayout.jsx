import React, { useState } from 'react';
import EditIcon from '../../../assets/icons/edit-icon.svg';
import AddIcon from '../../../assets/icons/add-icon.svg';
import RefreshCourseIcon from '../../../assets/icons/refresh-course-icon.svg';
import { WideOperationsButton } from '../../buttons/WideOperationsButton';
import { FinanceAccount } from './FinanceAccount';
import OutlineButton from '../../buttons/OutlineButton';
import { CryptoOperationHistory } from './CryptoOperationHistory';
import { CryptoAssets } from './CryptoAssets';
import { accounts, operations, fetchedCoinsPrices } from '../../../db';
import { CryptoResult } from './CryptoResult';
import { useDispatch, useSelector } from 'react-redux';
import { currencySelector, rubleCourseSelector } from '../../../store/selectors';
import { calculateValueInCurrency } from '../../../utils/calculateValueInCurrency';
import { getCourseAction } from '../../../store/actions/getCourseAction';
import TopRowCard from './CryptoCards/TopRowCard';
import { HistoryLayout } from './CryptoOperationHistory/HistoryLayout';
import { OperationsPanel } from '../../OperationsPanelButtons/OperationsPanel';

export const CryptoLayout = () => {
	const [isLoading, setIsLoading] = useState(false);

	const isUSD = useSelector(currencySelector);
	const rubleCourse = useSelector(rubleCourseSelector);
	const dispatch = useDispatch();

	const handleClickGetCourse = async () => {
		setIsLoading(true);
		try {
			await dispatch(getCourseAction());
			await new Promise((resolve) => setTimeout(resolve, 1000));
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const operationsInCurrency = operations.map((operation) => ({
		...operation,
		amount: calculateValueInCurrency(operation.amount, isUSD, rubleCourse),
	}));
	const accountsInCurrency = accounts.map((account) => ({
		...account,
		balance: calculateValueInCurrency(account.balance, isUSD, rubleCourse),
	}));

	return (
		<div className="flex flex-col gap-4">
			<section
				id="layout__crypto-top__line"
				className="flex flex-4 xl:flex-6 2xl:flex-nowrap flex-wrap gap-4"
			>
				<TopRowCard coinTitle={'Bitcoin'} flex={'flex-2'} />
				<TopRowCard coinTitle={'Etherium'} flex={'flex-2'} />
				<TopRowCard coinTitle={'BNB'} flex={'flex-2'} />
				<TopRowCard coinTitle={'Kaspa'} flex={'flex-2'} />
				<TopRowCard coinTitle={'News'} flex={'flex-5'} />
			</section>
			<section
				id="layout__crypto"
				className="flex flex-10 xl:flex-10 2xl:flex-nowrap flex-wrap rounded-4xl gap-4"
			>
				<div className="flex flex-8 flex-col gap-4">
					<div
						id="col__finance-result"
						className="flex flex-col flex-4 gap-2 p-4 rounded-3xl bg-sky-950/40"
					>
						<div id="finance-result__and__course-button" className="flex justify-between gap-2">
							<div className="flex justify-between gap-2">
								<span className="font-medium text-2xl">Финансовый результат</span>
							</div>
							<OutlineButton
								disabled={false}
								alt="refresh course"
								isLoader={true}
								isLoading={isLoading}
								icon={RefreshCourseIcon}
								onClick={handleClickGetCourse}
							>
								Обновить курс
							</OutlineButton>
						</div>
						<CryptoResult isUSD={isUSD} rubleCourse={rubleCourse} />
					</div>
					<div id="row__accounts-and-history" className="flex flex-10 gap-4">
						<div id="operations__and_accounts-wrapper" className="flex flex-col flex-2 gap-4">
							<OperationsPanel onClick={''} />
							<section
								id="accouts__main__container"
								className="flex flex-col flex-8 p-4 rounded-3xl bg-sky-950/40 gap-0.5 snap-start"
							>
								<div id="accouts__header-and-button" className="flex gap-2 justify-between">
									<span className="text-2xl font-medium">Топ 20</span>
									<OutlineButton
										to={''}
										disabled={false}
										icon={EditIcon}
										alt="finance accounts"
									>
										<span className="text-base">Изменить</span>
									</OutlineButton>
								</div>
								<div
									id="accouts__wrapper"
									className="flex flex-col pr-1 mt-1 max-h-[47vh] rounded-[18px] overflow-y-auto overscroll-auto scrollbar"
								>
									{accountsInCurrency.map((account) => {
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
							className="flex flex-col flex-5 p-4 rounded-3xl bg-sky-950/40 gap-4"
						>
							<div className="flex justify-between gap-2">
								<span className=" text-2xl font-medium">История операций</span>
								<OutlineButton to={''} disabled={false} icon={EditIcon} alt="change history">
									<span className="text-base">Изменить</span>
								</OutlineButton>
							</div>
							<HistoryLayout operationsInCurrency={operationsInCurrency} accounts={accounts} />
						</div>
					</div>
				</div>

				<div className="flex flex-6 flex-row 2xl:flex-col gap-4">
					<div
						id="column__categories"
						className="flex flex-col flex-4	 p-4 rounded-3xl bg-sky-950/40"
					>
						<div id="categories__title-and-buitton" className="flex justify-between gap-2 mb-2">
							<p className="flex text-2xl font-medium mb-2 truncate">Мои активы</p>
							<OutlineButton to={''} disabled={false} icon={AddIcon} alt="finance accounts">
								<span className="text-base">Добавить/Удалить</span>
							</OutlineButton>
						</div>
						<div
							id="spend-categories__container"
							className="flex flex-4 flex-wrap gap-4 pr-2 justify-between max-h-[35vh] w-full rounded-[16px] overflow-y-auto overscroll-auto scroll-smooth scrollbar"
						>
							{fetchedCoinsPrices.result.map((coin) => {
								return (
									<CryptoAssets
										key={coin.id}
										averageBuyPrice={coin.assetsBuyPriceAVG}
										assetsAmount={parseFloat(coin.assetsAmount)}
										coinPrice={parseFloat(coin.price).toFixed(2)}
										growValue={parseFloat(coin.priceChange1d)}
										categorie={coin.name}
										icon={coin.icon}
										symbol={coin.symbol}
									/>
								);
							})}
						</div>
					</div>
					<div id="column__income-chart" className="flex flex-8 p-4 rounded-3xl bg-sky-950/40">
						<span className="text-2xl font-medium">Доходы график</span>
					</div>
				</div>
			</section>
		</div>
	);
};

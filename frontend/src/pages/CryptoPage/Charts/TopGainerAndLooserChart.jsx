import React from 'react';
import { SectionContainerHeader } from '../../../components/SectionContainerHeader/SectionContainerHeader';
import { CardIcon } from '../../../components/CardIcon';
import { Loader } from '../../../components/Loaders/Loader';

export const TopGainerAndLooserChart = ({ data, title, type, isLoading }) => {
	const topGainerForDay = data.sort((a, b) => a.growValue - b.growValue);
	const arrayWithoutStablecoins = topGainerForDay.filter(
		(item) => item.symbol !== 'USDT' && item.symbol !== 'USDC' && item.symbol !== 'DAI',
	);
	const indexOfLastItem = arrayWithoutStablecoins.length - 1;
	console.log(' data', data);

	return isLoading ? (
		<Loader />
	) : (
		<section id="column__income-chart" className="flex flex-1 p-4 rounded-3xl  bg-sky-950/40">
			{type === 'looser' ? (
				<section className="flex flex-col w-full gap-2">
					<div className="flex gap-2 items-center">
						<SectionContainerHeader title={title} />
						<span
							className={`flex truncate ${topGainerForDay[0].growValue < 0 ? 'text-main-red' : 'text-main-green'}`}
						>
							{topGainerForDay[0].growValue} %
						</span>
					</div>
					<div className="flex flex-col gap-4 items-center justify-center w-full h-full">
						<div className="flex gap-2 items-center">
							<CardIcon size={'10'} icon={topGainerForDay[0]?.icon} />{' '}
							<span className="text-lg">{topGainerForDay[0]?.name}</span>
						</div>
						<div className="flex flex-col gap-2 items-center">
							<div className="flex flex-col items-center">
								<>
									<span className="text-sm">Баланс: </span>
									<span
										className={`text-lg ml-2 ${parseFloat(topGainerForDay[0]?.profit.slice(1).trim()) > 0 ? 'text-main-green' : 'text-main-red'}`}
									>
										{topGainerForDay[0]?.profit}
									</span>
								</>
							</div>
							<div className="flex flex-col items-center">
								<>
									<span className="text-sm">Профит в процентах: </span>{' '}
									<span
										className={`text-lg ml-2 ${parseFloat(topGainerForDay[0]?.profitPercentage) > 0 ? 'text-main-green' : 'text-main-red'}`}
									>
										{(topGainerForDay[0]?.profitPercentage).toFixed(2)} %
									</span>
								</>
							</div>
						</div>
					</div>
				</section>
			) : (
				<section className="flex flex-col w-full gap-2">
					<div className="flex gap-2 items-center">
						<SectionContainerHeader title={title} />
						<span
							className={`flex truncate ${topGainerForDay[indexOfLastItem].growValue < 0 ? 'text-main-red' : 'text-main-green'}`}
						>
							{topGainerForDay[indexOfLastItem].growValue} %
						</span>
					</div>
					<div className="flex flex-col gap-4 items-center justify-center w-full h-full">
						<div className="flex gap-2 items-center">
							<CardIcon size={'10'} icon={topGainerForDay[indexOfLastItem]?.icon} />{' '}
							<span className="text-lg">{topGainerForDay[indexOfLastItem]?.name}</span>
						</div>
						<div className="flex flex-col gap-2 items-center">
							<div className="flex flex-col items-center">
								<>
									<span className="text-sm">Баланс: </span>
									<span
										className={`text-lg ml-2 ${parseFloat(topGainerForDay[indexOfLastItem]?.profit.slice(1).trim()) > 0 ? 'text-main-green' : 'text-main-red'}`}
									>
										{topGainerForDay[indexOfLastItem]?.profit}
									</span>
								</>
							</div>
							<div className="flex flex-col items-center">
								<>
									<span className="text-sm">Профит в процентах: </span>{' '}
									<span
										className={`text-lg ml-2 ${parseFloat(topGainerForDay[indexOfLastItem]?.profitPercentage) > 0 ? 'text-main-green' : 'text-main-red'}`}
									>
										{(topGainerForDay[indexOfLastItem]?.profitPercentage).toFixed(2)} %
									</span>
								</>
							</div>
						</div>
					</div>
				</section>

				// <section className="flex flex-col w-full gap-2">
				// 	<SectionContainerHeader title={title} />
				// 	<div className="flex flex-col items-center justify-center w-full h-full">
				// 		<CardIcon size={'10'} icon={topGainerForDay[indexOfLastItem]?.icon} />
				// 	</div>
				// </section>
			)}
		</section>
	);
};

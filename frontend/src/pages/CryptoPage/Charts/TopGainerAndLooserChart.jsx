import React from 'react';
import { SectionContainerHeader } from '../../../components/SectionContainerHeader/SectionContainerHeader';
import { CardIcon } from '../../../components/CardIcon';

export const TopGainerAndLooserChart = ({ data, title, type }) => {
	const topGainerForDay = data.sort((a, b) => a.growValue - b.growValue);
	const arrayWithoutStablecoins = topGainerForDay.filter(
		(item) => item.symbol !== 'USDT' && item.symbol !== 'USDC' && item.symbol !== 'DAI',
	);
	const indexOfLastItem = arrayWithoutStablecoins.length - 1;

	return (
		<section id="column__income-chart" className="flex flex-2/12 p-4 rounded-3xl bg-sky-950/40">
			{type === 'looser' ? (
				<section className="flex flex-col w-full gap-2">
					<div className="flex gap-2 items-center">
						<SectionContainerHeader title={title} />
						<span
							className={`md:flex hidden truncate ${topGainerForDay[0]?.growValue < 0 ? 'text-main-red' : 'text-main-green'}`}
						>
							{topGainerForDay[0]?.growValue} %
						</span>
					</div>
					<div className="flex flex-col gap-2 items-center justify-center w-full h-full">
						<div className="flex gap-2 items-center">
							<CardIcon buttonSize={'12'} size={'8'} icon={topGainerForDay[0]?.icon} />{' '}
							<span className="text-md">{topGainerForDay[0]?.name}</span>
						</div>
						<div className="flex flex-col gap-2 items-center">
							<div className="flex flex-col items-center">
								<>
									<span className="text-md">Баланс: </span>
									<span
										className={`text-md ml-1 ${parseFloat(topGainerForDay[0]?.profit.slice(1).trim()) > 0 ? 'text-main-green' : 'text-main-red'}`}
									>
										{topGainerForDay[0]?.profit}
									</span>
								</>
							</div>
							<div className="flex flex-col items-center">
								<>
									<span className="text-md text-center">Профит в процентах: </span>{' '}
									<span
										className={`text-md ml-1 ${parseFloat(topGainerForDay[0]?.profitPercentage) > 0 ? 'text-main-green' : 'text-main-red'}`}
									>
										{parseInt(topGainerForDay[0]?.profitPercentage) || ''} %
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
							className={`md:flex hidden truncate ${topGainerForDay[indexOfLastItem]?.growValue < 0 ? 'text-main-red' : 'text-main-green'}`}
						>
							{topGainerForDay[indexOfLastItem]?.growValue} %
						</span>
					</div>
					<div className="flex flex-col gap-2 items-center justify-center w-full h-full">
						<div className="flex gap-2 items-center">
							<CardIcon
								buttonSize={'12'}
								size={'8'}
								icon={topGainerForDay[indexOfLastItem]?.icon}
							/>{' '}
							<span className="text-md">{topGainerForDay[indexOfLastItem]?.name}</span>
						</div>
						<div className="flex flex-col gap-2 items-center">
							<div className="flex flex-col items-center">
								<>
									<span className="text-md">Баланс: </span>
									<span
										className={`text-md ml-1 ${parseFloat(topGainerForDay[indexOfLastItem]?.profit.slice(1).trim()) > 0 ? 'text-main-green' : 'text-main-red'}`}
									>
										{topGainerForDay[indexOfLastItem]?.profit}
									</span>
								</>
							</div>
							<div className="flex flex-col items-center">
								<>
									<span className="text-md text-center">Профит в процентах: </span>
									<span
										className={`text-md ml-1 ${parseFloat(topGainerForDay[indexOfLastItem]?.profitPercentage) > 0 ? 'text-main-green' : 'text-main-red'}`}
									>
										{parseInt(topGainerForDay[indexOfLastItem]?.profitPercentage) || ''} %
									</span>
								</>
							</div>
						</div>
					</div>
				</section>
			)}
		</section>
	);
};

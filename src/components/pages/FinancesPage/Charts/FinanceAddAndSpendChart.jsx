import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { history } from '../../../../db';
import { aggregateChartDataByMonth, filteredByThisMonth, getsortedHistory } from '../../../../utils';
import { useSelector } from 'react-redux';
import { currencySelector, rubleCourseSelector } from '../../../../store/selectors';
import { ChartSelector } from '../../../sortSelector/chartSelector';
import { CustomTooltip } from '../../../CustomTooltip/CustomTooltip';

export const FinanceAddAndSpendChart = () => {
	const [selectedSortType, setSelectedSortType] = useState('days');

	const isUSD = useSelector(currencySelector);
	const roubleCourse = useSelector(rubleCourseSelector);
	const filteredHistoryForChart = history.filter((operation) => operation.tag === 'finance');

	const sortedHistory = getsortedHistory(
		filteredByThisMonth(filteredHistoryForChart, selectedSortType),
		'oldest',
	);
	const aggregatedData = aggregateChartDataByMonth(sortedHistory, selectedSortType);
	const mappedData = aggregatedData.map((item) => {
		return {
			...item,
			Доходы: isUSD ? (item.Доходы / roubleCourse).toFixed(2) : item.Доходы.toFixed(2),
			Расходы: isUSD ? (item.Расходы / roubleCourse).toFixed(2) : item.Расходы.toFixed(2),
			Баланс: isUSD ? (item.Баланс / roubleCourse).toFixed(2) : item.Баланс.toFixed(2),
		};
	});

	const handleSortChange = () => {
		if (selectedSortType === 'days') {
			setSelectedSortType('allTime');
		} else {
			setSelectedSortType('days');
		}
	};

	return (
		<div id="column__income-chart" className="flex flex-col flex-6 p-4 rounded-3xl bg-sky-950/40">
			<div className="flex gap-4 justify-between">
				<span className="text-xl font-medium truncate overflow-ellipsis">
					График доходов и расходов
				</span>
				<ChartSelector handleSortChange={handleSortChange} selectedSortType={selectedSortType} />
			</div>
			<div className="flex pt-2 h-full">
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart
						width={500}
						height={400}
						data={mappedData}
						margin={{
							top: 0,
							right: 0,
							left: 0,
							bottom: 0,
						}}
					>
						<defs>
							<linearGradient id="colorAdditions" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#b9ff80" stopOpacity={0.5} />
								<stop offset="98%" stopColor="#b9ff80" stopOpacity={0} />
							</linearGradient>
							<linearGradient id="colorSpendings" x1="0" y1="0" x2="0" y2="1">
								<stop offset="20%" stopColor="#ff81b6" stopOpacity={0.5} />
								<stop offset="98%" stopColor="#ff81b6" stopOpacity={0} />
							</linearGradient>
							<linearGradient id="colorStrokeAdditions" x1="0" y1="0" x2="0" y2="1">
								<stop offset="40%" stopColor="#b9ff80" stopOpacity={0.5} />
								<stop offset="98%" stopColor="#b9ff80" stopOpacity={0.1} />
							</linearGradient>
							<linearGradient id="colorStrokeSpendings" x1="0" y1="0" x2="0" y2="1">
								<stop offset="40%" stopColor="#ff81b6" stopOpacity={0.5} />
								<stop offset="98%" stopColor="#ff81b6" stopOpacity={0.1} />
							</linearGradient>
						</defs>
						{/* <CartesianGrid strokeDasharray="1 3" /> */}
						<XAxis dataKey="date" />
						{/* <YAxis } /> */}
						<Tooltip content={<CustomTooltip />} />
						{/* <Tooltip /> */}
						<Legend verticalAlign="top" align="center" />
						{/* <Area
							type="monotone"
							dataKey="Баланс"
							stackId="3"
							strokeWidth={2}
							stroke="rgba(15, 109, 163, 0.9)"
							fill="rgba(9, 62, 112, 0.9)"
						/> */}
						<Area
							type="monotone"
							dataKey="Доходы"
							stackId="2"
							stroke="url(#colorStrokeAdditions)"
							strokeWidth={2}
							fill="url(#colorAdditions)"
						/>
						<Area
							type="monotone"
							dataKey="Расходы"
							stackId="2"
							stroke="url(#colorStrokeSpendings)"
							strokeWidth={2}
							fill="url(#colorSpendings)"
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

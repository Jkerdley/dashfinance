import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { history } from '../../../../db';
import { aggregateChartDataByMonth } from '../../../../utils';
import { useSelector } from 'react-redux';
import { currencySelector, rubleCourseSelector } from '../../../../store/selectors';

const data = [
	{
		name: '20.01.2025',
		Баланс: 4000,
		Доходы: 1000,
		Расходы: 1000,
	},
	{
		name: '21.01.2025',
		Баланс: 3700,
		Доходы: 200,
		Расходы: 500,
	},
	{
		name: '22.01.2025',
		Баланс: 4150,
		Доходы: 550,
		Расходы: 100,
	},
	{
		name: '23.01.2025',
		Баланс: 4000,
		Доходы: 0,
		Расходы: 150,
	},
	{
		name: '24.01.2025',
		Баланс: 3450,
		Доходы: 350,
		Расходы: 900,
	},
	{
		name: '25.01.2025',
		Баланс: 3500,
		Доходы: 500,
		Расходы: 450,
	},
	{
		name: '26.01.2025',
		Баланс: 4450,
		Доходы: 1000,
		Расходы: 50,
	},
	{
		name: '27.01.2025',
		Баланс: 4000,
		Доходы: 1000,
		Расходы: 1000,
	},
	{
		name: '28.01.2025',
		Баланс: 3700,
		Доходы: 200,
		Расходы: 500,
	},
	{
		name: '29.01.2025',
		Баланс: 4150,
		Доходы: 550,
		Расходы: 100,
	},
	{
		name: '30.01.2025',
		Баланс: 4000,
		Доходы: 100,
		Расходы: 150,
	},
	{
		name: '31.01.2025',
		Баланс: 3450,
		Доходы: 350,
		Расходы: 900,
	},
];

const CustomTooltip = ({ active, payload, label }) => {
	if (!active || !payload || payload.length === 0) {
		return null;
	}

	const { Доходы, Расходы } = payload[0].payload;

	return (
		<div className="bg-sky-950/70 rounded-lg p-4 shadow-lg">
			<h6 className="text-gray-50/90 text-md font-semibold">{label}</h6>
			{/* <span className="block text-gray-50/90 mt-1">
				<strong>Баланс:</strong> {Баланс}
			</span> */}
			<span className="block text-gray-50/90 mt-1">
				<strong>Доходы:</strong> {Доходы}
			</span>
			<span className="block text-gray-50/90 mt-1">
				<strong>Расходы:</strong> {Расходы}
			</span>
		</div>
	);
};

export const FinanceAddAndSpendChart = () => {
	const isUSD = useSelector(currencySelector);
	const roubleCourse = useSelector(rubleCourseSelector);
	const filteredHistoryForChart = history.filter((operation) => operation.tag === 'finance');

	const aggregatedData = aggregateChartDataByMonth(filteredHistoryForChart);
	const mappedData = aggregatedData.map((item) => {
		return {
			...item,
			Доходы: isUSD ? (item.Доходы / roubleCourse).toFixed(2) : item.Доходы.toFixed(2),
			Расходы: isUSD ? (item.Расходы / roubleCourse).toFixed(2) : item.Расходы.toFixed(2),
			Баланс: isUSD ? (item.Баланс / roubleCourse).toFixed(2) : item.Баланс.toFixed(2),
		};
	});
	return (
		<div id="column__income-chart" className="flex flex-col flex-6 p-4 rounded-3xl bg-sky-950/40">
			<span className="text-2xl font-medium">График доходов и расходов</span>
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
								<stop offset="60%" stopColor="#b9ff80" stopOpacity={0.5} />
								<stop offset="98%" stopColor="#b9ff80" stopOpacity={0.2} />
							</linearGradient>
							<linearGradient id="colorStrokeSpendings" x1="0" y1="0" x2="0" y2="1">
								<stop offset="60%" stopColor="#ff81b6" stopOpacity={0.5} />
								<stop offset="98%" stopColor="#ff81b6" stopOpacity={0.2} />
							</linearGradient>
						</defs>
						{/* <CartesianGrid strokeDasharray="1 3" /> */}
						<XAxis dataKey="date" />
						{/* <YAxis /> */}
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

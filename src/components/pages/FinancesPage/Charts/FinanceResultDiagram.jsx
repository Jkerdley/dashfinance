import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useSelector } from 'react-redux';
import { currencySelector, rubleCourseSelector } from '../../../../store/selectors';
import { aggregateExpensesByCategory, filteredByThisMonth, getsortedHistory } from '../../../../utils';
import { history } from '../../../../db';
import { CustomRadialTooltip } from '../../../CustomTooltip';

export const FinanceResultDiagram = ({ selectedSortType }) => {
	const isUSD = useSelector(currencySelector);
	const roubleCourse = useSelector(rubleCourseSelector);
	const filteredHistoryForChart = history.filter(
		(operation) => operation.tag === 'finance' && operation.type === 'spend',
	);
	// console.log('filteredHistoryForChart', filteredHistoryForChart);
	console.log('selectedSortType in DIAGRAM', selectedSortType);

	const sortedHistory = getsortedHistory(
		filteredByThisMonth(filteredHistoryForChart, selectedSortType),
		'oldest',
	);

	const expensesByCategory = aggregateExpensesByCategory(sortedHistory);

	const mappedData = expensesByCategory.map((item) => {
		return {
			...item,
			value: isUSD
				? parseFloat(item.value / roubleCourse).toFixed(2)
				: parseFloat(item.value.toFixed(2)),
		};
	});
	console.log('mappedData', mappedData);

	const COLORS = [
		'#e03f8a',
		'#ff7285',
		'#e08d3f',
		'#ecbd56',
		'#f3d860',
		'#3ed682',
		'#3ed6ba',
		'#60d1f3',
		'#60acf3',
	];

	return (
		<div id="column__income-chart" className="flex relative items-center justify-center">
			<span className="absolute top-38 text-md font-medium text-center text-white/70">
				Диаграмма <br /> расходов
			</span>
			<PieChart width={300} height={200}>
				<Pie
					data={mappedData}
					cy={190}
					innerRadius={80}
					outerRadius={150}
					startAngle={180}
					endAngle={0}
					cornerRadius={4}
					stroke="none"
					paddingAngle={4}
					dataKey="value"
				>
					{mappedData.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Tooltip content={CustomRadialTooltip} />
			</PieChart>
		</div>
	);
};

// export const FinanceResultDiagram = ({ selectedSortType }) => {
// 	const isUSD = useSelector(currencySelector);
// 	const roubleCourse = useSelector(rubleCourseSelector);
// 	const filteredHistoryForChart = history.filter(
// 		(operation) => operation.tag === 'finance' && operation.type === 'spend',
// 	);

// 	const sortedHistory = getsortedHistory(
// 		filteredByThisMonth(filteredHistoryForChart, selectedSortType),
// 		'oldest',
// 	);
// 	const aggregatedData = aggregateChartDataByMonth(sortedHistory, selectedSortType);
// 	const mappedData = aggregatedData.map((item) => {
// 		return {
// 			...item,
// 			Доходы: isUSD
// 				? parseFloat(item.Доходы / roubleCourse.toFixed(2))
// 				: parseFloat(item.Доходы.toFixed(2)),
// 			Расходы: isUSD
// 				? parseFloat(item.Расходы / roubleCourse.toFixed(2))
// 				: parseFloat(item.Расходы.toFixed(2)),
// 			Баланс: isUSD
// 				? parseFloat(item.Баланс / roubleCourse.toFixed(2))
// 				: parseFloat(item.Баланс.toFixed(2)),
// 		};
// 	});

// 	const COLORS = [
// 		'#e03f8a',
// 		'#ff7285',
// 		'#e08d3f',
// 		'#ecbd56',
// 		'#f3d860',
// 		'#3ed682',
// 		'#3ed6ba',
// 		'#60d1f3',
// 		'#60acf3',
// 	];

// 	return (
// 		<div id="column__income-chart" className="flex relative items-center justify-center">
// 			<span className="absolute top-38 text-md font-medium text-center text-white/70">
// 				Диаграмма <br /> расходов
// 			</span>
// 			<PieChart width={300} height={200}>
// 				<Pie
// 					data={mappedData}
// 					cy={190}
// 					innerRadius={80}
// 					outerRadius={150}
// 					startAngle={180}
// 					endAngle={0}
// 					cornerRadius={6}
// 					stroke="none"
// 					fill="#8884d8"
// 					paddingAngle={4}
// 					dataKey="Расходы"
// 				>
// 					{mappedData.map((entry, index) => (
// 						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// 					))}
// 				</Pie>
// 				<Tooltip content={CustomRadialTooltip} />
// 			</PieChart>
// 		</div>
// 	);
// };

{
	/* <defs>
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
						</defs> */
}

// export const FinanceResultDiagram = () => {
// 	return (
// 		<div id="column__income-chart" className="flex flex-8 p-4 rounded-3xl  bg-sky-950/40">
// 			<span className="text-2xl font-medium">ТУТ БУДЕТ диаграмма</span>
// 		</div>
// 	);
// };

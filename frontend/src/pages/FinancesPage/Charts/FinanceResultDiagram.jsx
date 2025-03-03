import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useSelector } from 'react-redux';
import { selectHistory } from '../../../store/selectors';
import { aggregateExpensesByCategory, filteredByThisMonth, getsortedHistory } from '../../../utils';
import { CustomRadialTooltip } from '../../../components/CustomTooltip';
import { useCurrency } from '../../../hooks';

export const FinanceResultDiagram = ({ selectedSortType }) => {
	const { isUSD, rubleCourse } = useCurrency();
	const financeHistory = useSelector(selectHistory);
	const filteredHistoryForChart = financeHistory.filter((operation) => operation.type === 'spend');

	const sortedHistory = getsortedHistory(
		filteredByThisMonth(filteredHistoryForChart, selectedSortType),
		'oldest',
	);

	const expensesByCategory = aggregateExpensesByCategory(sortedHistory);

	const mappedData = expensesByCategory.map((item) => {
		return {
			...item,
			value: isUSD
				? parseFloat((item.value / rubleCourse).toFixed(2))
				: parseFloat(item.value.toFixed(2)),
		};
	});

	const COLORS = [
		'#ee529b',
		'#ff7285',
		'#e08d3f',
		'#ecbd56',
		'#f3d860',
		'#3ed682',
		'#5ae0a2',
		'#3ed6ba',
		'#59e7e7',
		'#60d1f3',
		'#6ed1f8',
	];

	return (
		<div id="column__income-chart" className="flex relative items-center justify-center">
			<span className="absolute top-44 text-md font-medium text-center text-white/70">
				{mappedData.length === 0 ? '' : `Расходы`}
			</span>
			{mappedData.length === 0 ? (
				<span className="text-center">Нет расходов в этот период</span>
			) : (
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
			)}
		</div>
	);
};

/* <defs>
							<linearGradient id="colorAdditions" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#b9ff80" stopOpacity={0.5} />
								<stop offset="98%" stopColor="#b9ff80" stopOpacity={0} />
							</linearGradient>
							<linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
								<stop offset="20%" stopColor="#ff81b6" stopOpacity={0.5} />
								<stop offset="98%" stopColor="#ff81b6" stopOpacity={0} />
							</linearGradient>
							<linearGradient id="colorStrokeAdditions" x1="0" y1="0" x2="0" y2="1">
								<stop offset="40%" stopColor="#b9ff80" stopOpacity={0.5} />
								<stop offset="98%" stopColor="#b9ff80" stopOpacity={0.1} />
							</linearGradient>
							<linearGradient id="colorStrokeExpenses" x1="0" y1="0" x2="0" y2="1">
								<stop offset="40%" stopColor="#ff81b6" stopOpacity={0.5} />
								<stop offset="98%" stopColor="#ff81b6" stopOpacity={0.1} />
							</linearGradient>
						</defs> */

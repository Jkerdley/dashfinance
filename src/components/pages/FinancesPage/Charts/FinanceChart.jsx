import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CustomTooltip } from '../../../CustomTooltip/CustomTooltip';

export const FinanceChart = ({ mappedData }) => {
	return (
		<div className="flex pt-2 h-full">
			<ResponsiveContainer>
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
					</defs>
					{/* <CartesianGrid strokeDasharray="1 3" /> */}
					<XAxis dataKey="date" fontSize={12} />
					{/* <YAxis /> */}
					<Tooltip content={<CustomTooltip />} />
					{/* <Legend verticalAlign="top" align="center" /> */}
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
						stackId="1"
						stroke="url(#colorStrokeAdditions)"
						strokeWidth={2}
						fill="url(#colorAdditions)"
					/>
					<Area
						type="monotone"
						dataKey="Расходы"
						stackId="2"
						stroke="url(#colorStrokeExpenses)"
						strokeWidth={2}
						fill="url(#colorExpenses)"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
};

export default FinanceChart;

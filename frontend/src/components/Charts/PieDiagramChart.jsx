import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CustomRadialTooltip } from '../../components/CustomTooltip';

export const PieDiagramChart = ({ mappedData, isCrypto }) => {
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

	const pieProps = isCrypto
		? {
				cy: 150,
				innerRadius: 90,
				outerRadius: 150,
				startAngle: 360,
				endAngle: 0,
			}
		: {
				cy: 190,
				innerRadius: 80,
				outerRadius: 150,
				startAngle: 180,
				endAngle: 0,
			};

	return (
		<PieChart width={300} height={isCrypto ? 320 : 200}>
			<Pie
				data={mappedData}
				cy={190}
				{...pieProps}
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
			<Tooltip content={CustomRadialTooltip} isCrypto={true} />
		</PieChart>
	);
};

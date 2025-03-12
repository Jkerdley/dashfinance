import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CustomRadialTooltip } from '../../components/CustomTooltip';

export const PieDiagramChart = ({ mappedData, isCrypto }) => {
	// const startTime = performance.now();
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
				// cy: 230,
				// innerRadius: 110,
				// outerRadius: 190,
				// startAngle: 180,
				// endAngle: 0,
				// animationBegin: 0,
				// animationDuration: 500,
				cx: '50%',
				cy: '90%',
				innerRadius: '65%',
				outerRadius: '139%',
				startAngle: 180,
				endAngle: 0,
				animationBegin: 0,
				animationDuration: 500,
			}
		: {
				cx: '50%',
				cy: '90%',
				innerRadius: '65%',
				outerRadius: '139%',
				startAngle: 180,
				endAngle: 0,
				animationBegin: 0,
				animationDuration: 500,
			};

	return (
		<PieChart
			width={Math.min(window.innerWidth * 0.4, 440)}
			height={Math.min(window.innerWidth * 0.3, 290)}
		>
			<Pie
				data={mappedData}
				{...pieProps}
				endAngle={0}
				cornerRadius={4}
				stroke="none"
				paddingAngle={4}
				dataKey="value"
				isAnimationActive={true}
				animationEasing="ease-in-out"
			>
				{mappedData.map((entry, index) => (
					<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
				))}
			</Pie>
			<Tooltip content={CustomRadialTooltip} isCrypto={isCrypto} />
		</PieChart>
	);
};

// return (
// 	<PieChart
// 		width={Math.min(window.innerWidth * 0.9, 600)} // Максимальная ширина 600px
// 		height={Math.min(window.innerWidth * 0.6, 400)} // Сохраняем соотношение 3:2
// 		margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
// 	>
// 		<Pie
// 			data={mappedData}
// 			cx="50%"
// 			cy="50%"
// 			innerRadius="40%"
// 			outerRadius="70%"
// 			// ... остальные пропсы
// 		>
// 			{/* ... */}
// 		</Pie>
// 		<Tooltip
// 			content={<CustomRadialTooltip />}
// 			wrapperStyle={{
// 				maxWidth: '200px',
// 				whiteSpace: 'pre-wrap',
// 				backgroundColor: 'rgba(15, 56, 94, 0.9)',
// 			}}
// 		/>
// 	</PieChart>
// );
// };

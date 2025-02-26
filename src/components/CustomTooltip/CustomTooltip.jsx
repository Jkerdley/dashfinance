import React from 'react';
export const CustomTooltip = ({ active, payload, label }) => {
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

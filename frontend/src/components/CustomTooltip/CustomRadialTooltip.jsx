import React from 'react';
export const CustomRadialTooltip = ({ active, payload, label, isCrypto }) => {
	if (!active || !payload || payload.length === 0) {
		return null;
	}

	const { name, value } = payload[0].payload;

	return (
		<div className="bg-sky-950/70 rounded-lg p-4 shadow-lg">
			<h6 className="text-gray-50/90 text-md font-semibold">{name}</h6>
			<span className="block text-gray-50/90 mt-1">
				{isCrypto ? (
					<>
						<strong>Стоимость:</strong> {value}
					</>
				) : (
					<>
						<strong>Сумма расходов:</strong> {value}
					</>
				)}
			</span>
		</div>
	);
};

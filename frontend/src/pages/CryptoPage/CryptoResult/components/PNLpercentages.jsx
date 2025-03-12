import React from 'react';

export const PNLpercentages = ({ totalPNL, indexOfLastItem }) => {
	const calculateAverageProfitPercentage = (array, key) => {
		if (array.length === 0) return 0;

		const totalProfit = array.reduce((sum, item) => sum + item[key], 0);
		return totalProfit / array.length;
	};

	const averageProfit = calculateAverageProfitPercentage(totalPNL, 'profitPercentage');
	const todayProfit = calculateAverageProfitPercentage(totalPNL, 'growValue');

	return (
		<section className="flex flex-2 justify-center md:justify-evently 2xl:justify-around gap-12">
			<div className="flex gap-2 sm:flex-wrap  items-center justify-center">
				<span className="text-lg">Средний PNL за все время:</span>
				<div className="flex gap-2 justify-center">
					<span
						className={`text-lg truncate ${parseInt(averageProfit) < 0 ? 'text-main-red' : 'text-main-green'}`}
					>
						{parseInt(averageProfit)} %
					</span>
				</div>
			</div>
			<div className="flex gap-2 sm:flex-wrap  items-center justify-center">
				<span className="text-lg">Средний PNL за сегодня:</span>
				<div className="flex gap-2 justify-center">
					<span
						className={`text-lg truncate ${parseInt(todayProfit) < 0 ? 'text-main-red' : 'text-main-green'}`}
					>
						{parseInt(todayProfit)} %
					</span>
				</div>
			</div>
		</section>
	);
};

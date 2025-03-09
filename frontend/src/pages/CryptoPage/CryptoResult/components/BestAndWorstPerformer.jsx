import React from 'react';

export const BestAndWorstPerformer = ({ totalPNL, indexOfLastItem }) => {
	return (
		<section className="flex flex-2 justify-center md:justify-evently 2xl:justify-around gap-12">
			<div className="flex flex-col items-center justify-center h-full">
				<span className="text-sm xl:text-lg">Лучший актив:</span>
				<div className="flex gap-2 justify-center flex-wrap text-main-green/90">
					<span className="text-lg">{totalPNL[indexOfLastItem]?.name}:</span>
					<span className="text-lg">{totalPNL[indexOfLastItem]?.profit}</span>
					<span className="text-lg truncate">
						({parseInt(totalPNL[indexOfLastItem]?.profitPercentage)} %)
					</span>
				</div>
			</div>
			<div className="flex flex-col items-center justify-center h-full">
				<span className="text-sm xl:text-lg">Худший актив:</span>
				<div className="flex gap-2 justify-center flex-wrap text-main-red/90">
					<span className="text-lg">{totalPNL[0]?.name}:</span>
					<span className="text-lg">{totalPNL[0]?.profit}</span>
					<span className="text-lg truncate">({parseInt(totalPNL[0]?.profitPercentage)} %)</span>
				</div>
			</div>
		</section>
	);
};

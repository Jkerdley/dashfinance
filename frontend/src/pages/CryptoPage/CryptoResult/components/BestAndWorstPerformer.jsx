import React from 'react';

export const BestAndWorstPerformer = ({ totalPNL, indexOfLastItem }) => {
	return (
		<section className="flex flex-2 justify-center md:justify-evently 2xl:justify-around gap-12">
			<div className="flex flex-col items-center justify-center h-full">
				<span className="text-sm xl:text-lg">Лучший актив:</span>
				<div className="flex sm:flex-nowrap gap-2 justify-center flex-wrap text-main-green/90">
					<span className="sm:text-lg text-sm">{totalPNL[indexOfLastItem]?.name}:</span>
					<div className="flex flex-wrap justify-center gap-2">
						<span className="sm:text-lg text-sm">{totalPNL[indexOfLastItem]?.profit}</span>
						<span className="sm:text-lg text-sm truncate">
							{totalPNL.length > 0 ? parseInt(totalPNL[indexOfLastItem]?.profitPercentage) : ''}
							%
						</span>
					</div>
				</div>
			</div>
			<div className="flex flex-col items-center justify-center h-full">
				<span className="text-sm xl:text-lg">Худший актив:</span>
				<div className="flex sm:flex-nowrap gap-2 justify-center flex-wrap text-main-red/90">
					<span className="sm:text-lg text-sm">{totalPNL[0]?.name}:</span>
					<div className="flex flex-wrap justify-center gap-2">
						<span className="sm:text-lg text-sm">{totalPNL[0]?.profit}</span>
						<span className="sm:text-lg text-sm truncate">
							{totalPNL.length > 0 ? parseInt(totalPNL[0]?.profitPercentage) : ''}%
						</span>
					</div>
				</div>
			</div>
		</section>
	);
};

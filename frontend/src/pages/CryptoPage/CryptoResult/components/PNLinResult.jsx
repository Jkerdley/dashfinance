import React from 'react';

export const PNLinResult = ({ totalPNL, index, title }) => {
	return (
		<div className="flex flex-col items-center justify-center h-full">
			<span className="text-sm xl:text-lg">{title}</span>
			<div className="flex md:flex-nowrap flex-wrap gap-2 justify-center  text-main-green/90">
				<span className="sm:text-lg text-sm truncate">{totalPNL[index]?.name}:</span>
				<div className="flex  justify-center gap-2 truncate">
					<span className="sm:text-lg text-sm truncate">{totalPNL[index]?.profit}</span>
					<span className="sm:text-lg text-sm truncate">
						{totalPNL.length > 0 ? parseInt(totalPNL[index]?.profitPercentage) : ''}%
					</span>
				</div>
			</div>
		</div>
	);
};

import React from 'react';
import { PNLinResult } from './PNLinResult';

export const BestAndWorstPerformer = ({ totalPNL, indexOfLastItem }) => {
	return (
		<section className="flex flex-2 justify-center md:justify-evently 2xl:justify-around md:gap-6 gap-2">
			<PNLinResult totalPNL={totalPNL} index={indexOfLastItem} title={'Лучший актив:'} />
			<PNLinResult totalPNL={totalPNL} index={0} title={'Худший актив:'} />
		</section>
	);
};

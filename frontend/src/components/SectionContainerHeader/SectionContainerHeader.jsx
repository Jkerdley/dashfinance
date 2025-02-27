import React from 'react';

export const SectionContainerHeader = ({ title }) => {
	return (
		<div className="flex">
			<span className="text-xl font-medium overflow-hidden whitespace-nowrap text-ellipsis max-w-xs">
				{title}
			</span>
		</div>
	);
};

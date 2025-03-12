import React from 'react';

export const SectionContainerHeader = ({ title }) => {
	return (
		<span className="text-lg lg:text-xl font-medium overflow-hidden truncate whitespace-nowrap max-w-xs overflow-ellipsis">
			{title}
		</span>
	);
};

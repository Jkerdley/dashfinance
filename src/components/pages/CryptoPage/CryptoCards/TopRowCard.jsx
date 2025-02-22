import React from 'react';

export const TopRowCard = ({ coinTitle, flex }) => {
	return (
		<div className={`flex py-2 px-4 ${flex} bg-sky-950/40 h-auto min-h-20 rounded-3xl`}>{coinTitle}</div>
	);
};

export default TopRowCard;

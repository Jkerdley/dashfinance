import React from 'react';
export const CardIcon = ({ icon, noBackground, size = 6, buttonSize = 11, padding }) => {
	const background = noBackground ? '' : 'bg-sky-950';
	return (
		<div
			className={`flex shrink-0 w-10 h-10 md:w-${buttonSize} md:h-${buttonSize} ${padding} justify-center items-center rounded-xl ${background} ${noBackground ? '' : 'cursor-default'}`}
		>
			<img className={` rounded-md h-${size} w-${size}`} src={icon} />
		</div>
	);
};

import React from 'react';
export const CardIcon = ({ icon, noBackground, size = 6, buttonSize = 11, padding }) => {
	const background = noBackground ? '' : 'bg-sky-950';
	return (
		<button
			className={`flex shrink-0 w-${buttonSize} h-${buttonSize} ${padding} justify-center items-center rounded-xl ${background} ${noBackground ? '' : 'cursor-default'}`}
		>
			<img className={`h-${size} w-${size}`} src={icon} />
		</button>
	);
};

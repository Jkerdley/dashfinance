import React from 'react';
export const CardIcon = ({ icon, noBackground, size = 5, buttonSize = 10, padding }) => {
	const background = noBackground ? '' : 'bg-sky-950';
	return (
		<button
			className={`flex w-${buttonSize} h-${buttonSize} ${padding} justify-center items-center rounded-lg ${background} ${noBackground ? '' : 'cursor-default'}`}
		>
			<img className={`h-${size} w-${size}`} src={icon} />
		</button>
	);
};

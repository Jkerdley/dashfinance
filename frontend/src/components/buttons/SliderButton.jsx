import React from 'react';

export const MenuSliderButton = ({ icon, alt, disabled, onClick, value, width }) => {
	return disabled ? (
		<button
			className={`flex ${width} h-11 p-2 justify-center items-center bg-gray-400 rounded-2xl transition-all duration-200 cursor-default `}
		>
			<img className="h-6" src={icon} alt={alt} />
		</button>
	) : (
		<button
			onClick={onClick}
			className={`flex ${width} h-11 p-2 gap-2 justify-center items-center hover:scale-x-110 bg-btn-color transition-all duration-200 rounded-2xl cursor-pointer overflow-hidden`}
		>
			<img className={`h-6 ${value ? 'rotate-180' : 'rotate-0'} shrink-0`} src={icon} alt={alt} />
		</button>
	);
};

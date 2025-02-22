import React from 'react';
import { Link } from 'react-router-dom';

export const MenuButton = ({ icon, alt, disabled, onClick, value, to, width, buttonText }) => {
	return disabled ? (
		<button
			className={`flex ${width} h-11 p-2 justify-center items-center bg-gray-400 rounded-2xl transition-all duration-200 cursor-default `}
		>
			<img className="h-6" src={icon} alt={alt} />
		</button>
	) : (
		<Link to={to}>
			<button
				onClick={onClick}
				className={`flex ${width} h-11 p-2 gap-2 justify-center items-center hover:scale-x-110 bg-sky-600 transition-all duration-200 rounded-2xl cursor-pointer overflow-hidden`}
			>
				<img className={`h-6 ${value} shrink-0`} src={icon} alt={alt} />
				{width === 'w-48' && (
					<span className="opacity-0 animate-fadeIn whitespace-nowrap">{buttonText}</span>
				)}
			</button>
		</Link>
	);
};

import React from 'react';
import { NavLink } from 'react-router-dom';

export const MenuButton = ({ icon, alt, disabled, to, width, buttonText }) => {
	return disabled ? (
		<button
			className={`flex ${width} h-11 p-2 justify-center items-center bg-gray-400 rounded-2xl transition-all duration-200 cursor-default `}
		>
			<img className="h-6" src={icon} alt={alt} />
		</button>
	) : (
		<NavLink
			to={to}
			className={({ isActive }) => `
		flex ${width} h-11 p-2 gap-2 justify-center items-center 
		hover:scale-x-110 hover:bg-sky-500/80 
		${isActive ? 'bg-transparent border-2 border-white' : 'bg-gradient-to-br from-sky-500 to-blue-900'} 
		transition-all duration-200 rounded-2xl cursor-pointer overflow-hidden
	`}
		>
			<img className={`h-6 shrink-0`} src={icon} alt={alt} />
			{width === 'w-48' && (
				<span className="opacity-0 animate-fadeIn whitespace-nowrap">{buttonText}</span>
			)}
		</NavLink>
	);
};

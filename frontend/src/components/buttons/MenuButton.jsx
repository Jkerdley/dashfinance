import React from 'react';
import { NavLink } from 'react-router-dom';

export const MenuButton = ({ icon, alt, disabled, to, width, buttonText, isWide }) => {
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
		group flex ${width} h-11 p-2 gap-2 justify-center items-center 
		${isWide ? 'hover:scale-x-105' : ''} hover:bg-btn-menuhover 
		${isActive ? 'bg-transparent border-2 border-white' : 'bg-btn-color border-none'} 
		transition-all duration-200 rounded-2xl cursor-pointer overflow-hidden
	`}
		>
			<img
				className={`h-6 shrink-0 ${isWide ? '' : 'group-hover:scale-110 transition-all duration-150 ease-in-out'}`}
				src={icon}
				alt={alt}
			/>
			{width === 'w-48' && (
				<span className="opacity-0 animate-fadeIn whitespace-nowrap">{buttonText}</span>
			)}
		</NavLink>
	);
};

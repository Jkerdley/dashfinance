import React from 'react';
import { Link } from 'react-router-dom';

export const MenuButton = ({ icon, alt, disabled, onClick, padding, value, to, width, children }) => {
	return disabled ? (
		<button
			onClick={onClick}
			className={`flex ${width} h-11 ${padding} justify-center items-center bg-gray-400 rounded-2xl cursor-default`}
		>
			<img className="h-6" src={icon} alt={alt} />
		</button>
	) : (
		<Link to={to}>
			<button
				onClick={onClick}
				className={`flex ${width} h-11 ${padding} gap-2 justify-center items-center transition ease-in-out hover:scale-105 bg-gradient-to-br from-sky-500 to-blue-900 hover:bg-gradient-to-b rounded-2xl`}
			>
				<img className={`h-6 ${value}`} src={icon} alt={alt} /> {children}
			</button>
		</Link>
	);
};

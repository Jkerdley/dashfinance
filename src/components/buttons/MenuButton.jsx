import React from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';

export const MenuButton = ({ icon, alt, disabled, onClick, value, to }) => {
	console.log('to', to);

	return disabled ? (
		<button
			onClick={onClick}
			className={`flex w-11 h-11 justify-center items-center bg-gray-400 rounded-2xl`}
		>
			<img className="h-6" src={icon} alt={alt} />
		</button>
	) : (
		<Link to={to}>
			<button
				onClick={onClick}
				className="flex w-11 h-11 justify-center items-center transition ease-in-out hover:scale-105 bg-gradient-to-br from-sky-500 to-blue-900 hover:bg-gradient-to-b rounded-2xl"
			>
				<img className={`h-6 ${value}`} src={icon} alt={alt} />
			</button>
		</Link>
	);
};

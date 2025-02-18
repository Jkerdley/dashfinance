import React from 'react';
export const Button = ({ icon, alt, disabled, onClick, children, padding }) => {
	return disabled ? (
		<button
			onClick={onClick}
			className="flex w-9 h-9 ${padding} justify-center items-center bg-gray-400 rounded-xl cursor-default"
		>
			<img className="h-6" src={icon} alt={alt} />
			{children}
		</button>
	) : (
		<button
			onClick={onClick}
			className={`flex w-9 h-9 ${padding} justify-center items-center transition ease-in-out duration-100 hover:scale-110 bg-gradient-to-br from-sky-500 to-blue-900 rounded-xl cursor-pointer`}
		>
			{children}
			<img className="h-6" src={icon} alt={alt} />
		</button>
	);
};

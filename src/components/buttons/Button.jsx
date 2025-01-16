import React from 'react';
export const Button = ({ icon, alt, disabled, onClick }) => {
	return disabled ? (
		<button
			onClick={onClick}
			className="flex w-9 h-9 justify-center items-center bg-gray-400 rounded-xl cursor-default"
		>
			<img className="h-6" src={icon} alt={alt} />
		</button>
	) : (
		<button
			onClick={onClick}
			className={`flex w-9 h-9 justify-center items-center transition ease-in-out delay-50 hover:scale-105 bg-gradient-to-br from-sky-500 to-blue-900 hover:bg-gradient-to-b rounded-xl`}
		>
			<img className="h-6" src={icon} alt={alt} />
		</button>
	);
};

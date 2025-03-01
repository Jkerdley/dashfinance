import React from 'react';
export const Button = ({ icon, alt, disabled, onClick, children, padding, width = 'w-9' }) => {
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
			className={`group flex ${width} h-9 ${padding} justify-center items-center transition-all
			ease-in-out duration-100 rounded-xl cursor-pointer
			bg-btn-color hover:bg-btn-hovercolor`}
		>
			{children}
			<img
				className="h-6 group-hover:rotate-12 transition-all duration-150 ease-in-out"
				src={icon}
				alt={alt}
			/>
		</button>
	);
};

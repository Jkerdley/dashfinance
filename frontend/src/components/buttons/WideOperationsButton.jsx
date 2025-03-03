import React from 'react';

export const WideOperationsButton = ({ disabled, onClick, icon, alt, children, color }) => {
	return disabled ? (
		<button
			disabled="true"
			className={`flex justify-center items-center pb-[3px] rounded-xl w-[46%] h-10 text-gray-500 bg-gray-500 cursor-default p-2`}
		>
			{children}
		</button>
	) : (
		<button
			onClick={onClick}
			id="button--wide-operation"
			className={`flex justify-center items-center pb-[3px] rounded-xl w-[46%] h-10 ${color} cursor-pointer text-black transition-all duration-200 ease hover:opacity-70`}
		>
			{children}
			{icon ? <img className={`h-6`} src={icon} alt={alt} /> : null}
		</button>
	);
};

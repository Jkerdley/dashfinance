import React from 'react';

export const WideOperationsButton = ({ disabled, onClick, icon, alt, children, color }) => {
	return disabled ? (
		<button disabled="true" className={`text-gray-500 bg-gray-500 cursor-default p-2 rounded`}>
			{children}
		</button>
	) : (
		<button
			onClick={onClick}
			id="button--wide-operation"
			className={`flex justify-center items-center pb-[3px] rounded-[1rem] w-[46%] h-10 ${color} cursor-pointer text-black transition-colors duration-200 ease hover:bg-stone-300`}
		>
			{children}
			{icon ? <img className={`h-6`} src={icon} alt={alt} /> : null}
		</button>
	);
};

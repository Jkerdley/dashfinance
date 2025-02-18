import React from 'react';
export const EditButton = ({ to, icon, size = 5 }) => {
	return (
		<button
			className={`flex h-9 w-9 p-1 justify-center items-center rounded-xl hover:border-1 hover:scale-110 cursor-pointer transition-all duration-100 ease-in`}
		>
			<img className={`h-${size}`} src={icon} />
		</button>
	);
};

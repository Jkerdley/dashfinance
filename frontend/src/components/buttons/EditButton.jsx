import React from 'react';
export const EditButton = ({ icon, size = 5 }) => {
	return (
		<button
			className={`group flex h-9 w-9 p-1.5 justify-center items-center rounded-xl border-[1.2px] hover:border-white border-cyan-900/0 cursor-pointer transition-all duration-100 ease-in`}
		>
			<img className={`h-${size} group-hover:rotate-y-180 duration-50 ease-in-out`} src={icon} />
		</button>
	);
};

import React from 'react';

export const TopRowCard = ({ coinTitle, flex, isAddButton, disabled, onClick }) => {
	const isDisabled = disabled ? '' : 'cursor-pointer';
	return isAddButton ? (
		<button onClick={onClick} className={`group flex flex-1/12 w-auto rounded-3xl ${isDisabled}`}>
			<div
				className={`flex py-2 px-4 ${flex} bg-sky-700/20 h-auto min-h-20 items-center justify-center rounded-3xl`}
			>
				<span
					className={`flex mb-1 duration-150 ease-in-out transition-all text-5xl font-bold ${disabled ? 'text-gray-100/20' : 'text-gray-100/70 group-hover:scale-110'}`}
				>
					&#43;
				</span>
			</div>
		</button>
	) : (
		<div className={`flex py-2 px-4 ${flex} bg-sky-950/40 min-h-20 rounded-3xl`}>{coinTitle}</div>
	);
};

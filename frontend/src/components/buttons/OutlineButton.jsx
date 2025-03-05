import React from 'react';

const OutlineButton = ({ disabled, onClick, icon, children, to, isLoader, isLoading }) => {
	return disabled ? (
		<button
			disabled={true}
			className={`cursor-default flex justify-center items-center rounded-xl w-auto px-4 h-9 border border-zinc-400 text-zinc-400 gap-2`}
		>
			{children}
			{icon ? <img className="h-5 opacity-45" src={icon} /> : null}
		</button>
	) : (
		<button
			onClick={onClick}
			className={`group flex justify-center items-center rounded-xl w-auto px-6 h-9 border border-white transition-all duration-150 ease-in-out cursor-pointer text-white gap-2 hover:bg-sky-800/60 hover:border-cyan-900/10 `}
		>
			<div className="flex items-center pb-[1px]">{children}</div>

			{icon ? (
				<img
					className={`h-5 transition-all ${isLoader && isLoading ? 'animate-spin-custom' : 'group-hover:rotate-12'} duration-150 ease-in-out fill-red-50`}
					src={icon}
				/>
			) : null}
		</button>
	);
};

export default OutlineButton;

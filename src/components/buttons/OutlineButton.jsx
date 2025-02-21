import React from 'react';

const OutlineButton = ({ disabled, onClick, icon, children, to }) => {
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
			className={`flex justify-center items-center rounded-xl w-auto px-4 h-9 border border-white transition-all duration-200 ease cursor-pointer text-white gap-2 hover:bg-sky-800/60 `}
		>
			{children}
			{icon ? <img className={`h-5`} src={icon} /> : null}
		</button>
	);
};

export default OutlineButton;

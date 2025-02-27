import React from 'react';

export const CloseModalButton = ({ onClick }) => {
	return (
		<button
			onClick={onClick}
			className="absolute top-4 right-4 group flex flex-col justify-center items-center lg:w-10 lg:h-10 md:w-9 md:h-9 w-8 h-8 rounded-lg outline-1
           hover:bg-sky-700/50 transition-all duration-200 hover:outline-blue-500/20 cursor-pointer"
			aria-label="Закрыть всплывающее окно"
		>
			<span
				className={`
    block w-5 h-0.5 bg-gray-50 rounded-lg transition-all duration-300 ease-in-out
    group-hover:bg-blue-400
    rotate-45
  `}
			/>
			<span
				className={`
    block w-5 h-0.5 bg-gray-50 rounded-lg transition-all duration-300 ease-in-out
    group-hover:bg-blue-400
    -rotate-45
  `}
			/>
		</button>
	);
};

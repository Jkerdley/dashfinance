import React from 'react';

export const BurgerButton = ({ isOpen, onClick }) => {
	return (
		<button
			onClick={onClick}
			className="group md:flex sm:flex 2xl:hidden xl:flex flex-col justify-center items-center w-10 h-10 rounded-lg outline-1
                   hover:bg-sky-700/50 transition-all duration-200 hover:outline-none transition:outline cursor-pointer"
			aria-label="Menu"
		>
			<span
				className={`
            block w-5 h-0.5 bg-gray-50 rounded-lg transition-all duration-300 ease-out
            group-hover:bg-blue-400
            ${isOpen ? 'rotate-45 translate-y-2' : 'group-hover:translate-x-1'}
          `}
			/>
			<span
				className={`
            block w-5 h-0.5 bg-gray-50 rounded-lg transition-all duration-300 ease-out my-1.5
            group-hover:bg-blue-400
            ${isOpen ? 'opacity-0' : ''}
          `}
			/>
			<span
				className={`
            block w-5 h-0.5 bg-gray-50 rounded-lg transition-all duration-300 ease-out
            group-hover:bg-blue-400
            ${isOpen ? '-rotate-45 -translate-y-2' : 'group-hover:-translate-x-1'}
          `}
			/>
		</button>
	);
};

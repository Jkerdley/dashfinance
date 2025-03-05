import React from 'react';
import PropTypes from 'prop-types';

export const BurgerButton = ({ isOpen, onClick }) => {
	return (
		<button
			onClick={onClick}
			className={`
                group flex md:flex sm:flex 2xl:hidden xl:flex flex-col justify-center items-center 
                lg:w-10 lg:h-10 md:w-9 md:h-9 w-8 h-8 rounded-lg outline-1
                hover:bg-sky-700/50 transition-all duration-200 hover:outline-blue-500/20 cursor-pointer
                ${isOpen ? 'bg-sky-700/30' : ''}
            `}
			aria-label={isOpen ? 'Close menu' : 'Open menu'}
		>
			<span
				className={`
                    block w-5 h-0.5 bg-gray-50 rounded-lg transition-all duration-400 ease-in-out
                    group-hover:bg-blue-400
                    ${isOpen ? 'rotate-45 translate-y-2 group-hover:scale-x-130' : 'group-hover:translate-x-1'}
                `}
			/>
			<span
				className={`
                    block w-5 h-0.5 bg-gray-50 rounded-lg transition-all duration-400 ease-in-out my-1.5
                    group-hover:bg-blue-400
                    ${isOpen ? 'opacity-0' : ''}
                `}
			/>
			<span
				className={`
                    block w-5 h-0.5 bg-gray-50 rounded-lg transition-all duration-400 ease-in-out
                    group-hover:bg-blue-400
                    ${isOpen ? '-rotate-45 -translate-y-2 group-hover:scale-x-130' : 'group-hover:-translate-x-1'}
                `}
			/>
		</button>
	);
};

BurgerButton.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
};

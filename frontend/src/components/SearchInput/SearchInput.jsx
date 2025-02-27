import React from 'react';
import SearchIcon from '../../assets/icons/search-icon.svg';
export const SearchInput = () => {
	return (
		<div className="flex items-center justify-between">
			<input
				name="search"
				className="w-auto 2xl:w-120 xl:flex hidden h-10 rounded-xl bg-gray-200/40 pr-12 pl-2 transition-all duration-350 ease-in"
				type="text"
				aria-label="search"
			/>
			<button className="xl:flex hidden ml-[-36px]">
				<img className="h-6" src={SearchIcon} alt="search" />
			</button>
		</div>
	);
};

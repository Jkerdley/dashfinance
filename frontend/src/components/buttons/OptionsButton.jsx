import React from 'react';
import OptionsIcon from '../../assets/icons/options-icon.svg';
import DeleteIcon from '../../assets/icons/delete-icon.svg';

export const OptionsButton = ({ deleteIcon, onClick, flex, size = 5 }) => {
	return (
		<div className={`flex ${flex} justify-end shrink-0`}>
			<button
				onClick={onClick}
				className={`group flex h-9 w-9 p-1.5 justify-center items-center rounded-xl border-[1.2px] hover:border-white border-cyan-900/0 cursor-pointer transition-all duration-100 ease-in`}
			>
				<img
					className={`h-${size} ${deleteIcon ? 'group-hover:rotate-12 duration-150' : 'group-hover:rotate-y-180 duration-50'} ease-in-out`}
					src={deleteIcon ? DeleteIcon : OptionsIcon}
				/>
			</button>
		</div>
	);
};

import React from 'react';
import OutlineButton from './OutlineButton';
import AddIcon from '../../assets/icons/add-icon.svg';

export const AddAndDeleteButton = ({ to, alt }) => {
	return (
		<OutlineButton to={to} disabled={false} icon={AddIcon} alt={alt}>
			<span className="flex-shrink overflow-hidden text-base truncate">Добавить/Удалить</span>
		</OutlineButton>
	);
};

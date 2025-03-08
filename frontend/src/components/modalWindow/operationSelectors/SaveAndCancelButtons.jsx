import React from 'react';
import PropTypes from 'prop-types';
import { WideOperationsButton } from '../../buttons';

export const SaveAndCancelButtons = ({ handleFormSubmit, onClose }) => {
	return (
		<section id="save-and-cancel__buttons" className="flex px-20 justify-evenly mb-10 flex-wrap gap-4">
			<WideOperationsButton
				type="submit"
				onClick={handleFormSubmit}
				color={'bg-main-green'}
				alt="Сохранить"
			>
				<span className="text-lg font-semibold">Сохранить</span>
			</WideOperationsButton>
			<WideOperationsButton type="button" onClick={onClose} color={'bg-main-red'} alt="Отмена">
				<span className="text-lg font-semibold">Отмена</span>
			</WideOperationsButton>
		</section>
	);
};

SaveAndCancelButtons.propTypes = {
	handleFormSubmit: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
};

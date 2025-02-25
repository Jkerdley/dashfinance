import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../buttons';
import { selectModalisOpen } from '../../store/selectors/select-modal-is-open';
import { selectModalOnCancel } from '../../store/selectors/select-modal-oncancel';
import { selectModalOnConfirm } from '../../store/selectors/select-modal-onconfirm';

export const ModalWindowLayout = () => {
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);
	const isOpen = useSelector(selectModalisOpen);
	console.log('isOpen', isOpen);

	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-20 ">
			<div className="absolute w-full h-full bg-gray-950/90 rounded-4xl"></div>
			<div className="relative w-[45vw] h-[30vh] mx-auto px-2 pt-4 z-30 top-1/2 -translate-y-1/2 bg-sky-950/90 rounded-4xl text-center ">
				<h3>ВОПРОС МОДАЛЬНОГО ОКНА</h3>
				<select>
					<option value="account1">Аккаунт 1</option>
					<option value="account2">Аккаунт 2</option>
				</select>
				<select>
					<option value="category1">Категория 1</option>
					<option value="category2">Категория 2</option>
				</select>
				<div className="flex justify-evenly">
					<Button width="w-32" onClick={onConfirm}>
						Сохранить
					</Button>
					<Button width="w-32" onClick={onCancel}>
						Отмена
					</Button>
				</div>
			</div>
		</div>
	);
};

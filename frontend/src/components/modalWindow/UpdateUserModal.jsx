import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseModal } from './base/BaseModal';
import { request } from '../../utils';
import { UserForm } from './forms';
import { selectUser } from '../../store/selectors';
import { fetchUserData } from '../../store/actions/async';

export const UpdateUserModal = ({ isOpen, onClose }) => {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const [error, setError] = useState('');
	const [userName, setUserName] = useState(user.name || '');

	const handleNameChange = (event) => {
		const value = event.target.value;
		setUserName(value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const nameValue = userName;

		if (nameValue.length === 0) {
			alert('Имя не может быть пустым');
		}

		if (!user._id) {
			alert('Ошибка: идентификатор пользователя не найден.');
			return;
		}

		try {
			const response = await request(`/user/${user._id}`, 'PATCH', { userName });

			dispatch(fetchUserData(response.user));
			localStorage.setItem('user', JSON.stringify(response.user));
			onClose();
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<BaseModal isOpen={isOpen} onClose={onClose} width="w-[40vw]" position="center">
			<section className="flex flex-col justify-center p-4 h-full">
				<UserForm
					formData={userName}
					handleSubmit={handleSubmit}
					handleNameChange={handleNameChange}
					error={error}
					onClose={onClose}
				/>
			</section>
		</BaseModal>
	);
};

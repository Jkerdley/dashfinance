import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseModal } from './base/BaseModal';
import { UserForm } from './forms';
import { selectUser } from '../../store/slices/userSlice';
import { setUserData } from '../../store/slices/userSlice';
import { useUpdateUserMutation } from '../../store/api/backendApi';

export const UpdateUserModal = ({ isOpen, onClose }) => {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const [error, setError] = useState('');
	const [userName, setUserName] = useState(user.name || '');
	const [updateUserMutation] = useUpdateUserMutation();

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
			const response = await updateUserMutation({ id: user._id, userName }).unwrap();
			dispatch(setUserData(response.user));
			onClose();
		} catch (error) {
			setError(error.data?.error || error.message);
		}
	};

	return (
		<BaseModal isOpen={isOpen} onClose={onClose} width="md:w-[60vw] w-[90vw]" position="center">
			<section className="flex flex-col justify-center p-4">
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

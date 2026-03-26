import React, { useState } from 'react';
import { BaseModal } from './base/BaseModal';
import { UserForm } from './forms';
import { useGetUserQuery, useUpdateUserMutation } from '../../store/api/backendApi';

export const UpdateUserModal = ({ isOpen, onClose }) => {
	const { data } = useGetUserQuery();
	const user = data?.user || {};

	const [error, setError] = useState('');
	const [userName, setUserName] = useState(user.name || '');
	const [updateUserMutation] = useUpdateUserMutation();

	const handleNameChange = (event) => {
		setUserName(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!userName.trim()) {
			alert('Имя не может быть пустым');
			return;
		}

		if (!user._id) {
			alert('Ошибка: идентификатор пользователя не найден.');
			return;
		}

		try {
			await updateUserMutation({ id: user._id, userName }).unwrap();
			onClose();
		} catch (error) {
			setError(error.data?.error || error.message);
		}
	};

	return (
		<BaseModal isOpen={isOpen} onClose={onClose} width="md:w-[60vw] w-[90vw]" position="center">
			<div className="flex flex-col justify-center p-4">
				<UserForm
					formData={userName}
					handleSubmit={handleSubmit}
					handleNameChange={handleNameChange}
					error={error}
					onClose={onClose}
				/>
			</div>
		</BaseModal>
	);
};

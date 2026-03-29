import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { BaseModal } from './base/BaseModal';
import { UserForm } from './forms';
import { useGetUserQuery, useUpdateUserMutation } from '../../store/api/backendApi';

interface UpdateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const UpdateUserModal = ({ isOpen, onClose }: UpdateUserModalProps) => {
    const { data } = useGetUserQuery();
    const user = data?.user;

    const [error, setError] = useState('');
    const [userName, setUserName] = useState(user?.name || '');
    const [updateUserMutation] = useUpdateUserMutation();

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!userName.trim()) {
            alert('Имя не может быть пустым');
            return;
        }

        if (!user?.id) {
            alert('Ошибка: идентификатор пользователя не найден.');
            return;
        }

        try {
            await updateUserMutation({ id: user.id, userName }).unwrap();
            onClose();
        } catch (error: any) {
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

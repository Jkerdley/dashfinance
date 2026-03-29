import type { ChangeEvent, FormEvent } from 'react';
import { SaveAndCancelButtons } from '../operationSelectors';

interface UserFormProps {
    formData: string;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    onClose: () => void;
}

export const UserForm = ({ formData, handleSubmit, handleNameChange, error, onClose }: UserFormProps) => {
    return (
        <section className="flex flex-col items-center justify-evenly gap-6 min-h-[25vh]">
            <h2 className="text-2xl mb-4">Изменить данные пользователя</h2>
            {error && <div className="mb-4">{error}</div>}

            <form className="flex flex-col gap-6 items-center justify-between" onSubmit={handleSubmit}>
                <section className="flex flex-col w-3/5">
                    <label className="block mb-2 w-full">Имя пользователя</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full p-2 rounded-lg bg-sky-950/50"
                        placeholder={formData}
                        value={formData}
                        onChange={handleNameChange}
                        required
                    />
                </section>

                <SaveAndCancelButtons onClose={onClose} />
            </form>
        </section>
    );
};

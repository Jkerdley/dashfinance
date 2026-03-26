import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRegisterMutation } from '../../store/api/backendApi';
import { ROLES_ENUM } from '../../constants/roles';
import { APP_ROUTES } from '../../constants/routes';

export const RegisterPage = () => {
	const [error, setError] = useState('');
	const [registerMutation, { isLoading }] = useRegisterMutation();
	const navigate = useNavigate();

	const handleRegisterAction = async (formData) => {
		const login = formData.get('login');
		const password = formData.get('password');
		const name = formData.get('name');

		setError('');

		try {
			await registerMutation({
				login,
				password,
				name,
				role: ROLES_ENUM.USER,
			}).unwrap();

			navigate(APP_ROUTES.FINANCES);
		} catch (err) {
			setError(err.data?.error || err.message);
		}
	};

	return (
		<main className="flex flex-col gap-4 items-center justify-center h-[90vh] w-full">
			<form
				action={handleRegisterAction}
				className="flex flex-col bg-sky-200/10 p-6 rounded-4xl shadow-md w-full max-w-sm gap-4"
			>
				<h2 className="text-2xl mb-4">Регистрация</h2>

				{error && <p className="text-red-500">{error}</p>}

				<div className="mb-4">
					<label className="block text-sky-200">Логин</label>
					<input
						type="text"
						name="login"
						className="border rounded w-full py-2 px-3 mt-2 transition-all duration-500 ease focus:border-sky-300"
						required
					/>
				</div>

				<div className="mb-4">
					<label className="block text-sky-200">Пароль</label>
					<input
						type="password"
						name="password"
						className="border rounded w-full py-2 px-3 mt-2 transition-all duration-500 ease focus:border-sky-300"
						required
					/>
				</div>

				<div className="mb-4">
					<label className="block text-sky-200">Имя, фамилия (или Никнейм)</label>
					<input
						type="text"
						name="name"
						className="border rounded w-full py-2 px-3 mt-2 transition-all duration-500 ease focus:border-sky-300"
						required
					/>
				</div>

				<button
					type="submit"
					disabled={isLoading}
					className="bg-btn-color hover:bg-btn-menuhover disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white text-md py-2 px-4 w-full cursor-pointer transition-all duration-200 ease-in-out"
				>
					{isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
				</button>
			</form>

			<Link
				to={APP_ROUTES.LOGIN}
				className="flex text-md cursor-pointer hover:opacity-65 hover:underline transition-all duration-200 ease-in-out"
			>
				- Войти в аккаунт -
			</Link>
		</main>
	);
};

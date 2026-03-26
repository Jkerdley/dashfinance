import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLoginMutation } from '../../store/api/backendApi';
import { APP_ROUTES } from '../../constants/routes';

export const LoginPage = () => {
	const [error, setError] = useState('');
	const [loginMutation, { isLoading }] = useLoginMutation();
	const navigate = useNavigate();

	const handleLoginAction = async (formData) => {
		const login = formData.get('login');
		const password = formData.get('password');

		setError('');

		try {
			await loginMutation({ login, password }).unwrap();
			navigate(APP_ROUTES.HOME);
		} catch (err) {
			setError(err.data?.error || err.message);
		}
	};

	return (
		<main className="flex flex-col gap-4 items-center justify-center w-full h-[90vh]">
			<form
				action={handleLoginAction}
				className="flex flex-col bg-sky-200/10 p-6 rounded-4xl shadow-md w-full max-w-sm gap-4"
			>
				<h2 className="text-2xl mb-4">Вход</h2>
				{error && <p className="text-red-500">{error}</p>}

				<div className="mb-4">
					<label className="block text-sky-200">Логин</label>
					<input
						type="text"
						name="login"
						className="border rounded w-full py-2 px-3 focus:border-sky-300"
						required
					/>
				</div>

				<div className="mb-4">
					<label className="block text-sky-200">Пароль</label>
					<input
						type="password"
						name="password"
						className="border rounded w-full py-2 px-3 focus:border-sky-300"
						required
					/>
				</div>

				<button
					type="submit"
					disabled={isLoading}
					className="bg-btn-color hover:bg-btn-menuhover disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white text-md py-2 px-4 w-full cursor-pointer transition-all duration-200 ease-in-out"
				>
					{isLoading ? 'Вход...' : 'Войти'}
				</button>
			</form>

			<Link
				to={APP_ROUTES.REGISTER}
				className="flex text-md cursor-pointer hover:opacity-65 hover:underline transition-all duration-200 ease-in-out"
			>
				- Зарегистрироваться -
			</Link>
		</main>
	);
};

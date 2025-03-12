import React, { useState } from 'react';
import { request } from '../../utils';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserData } from '../../store/actions/async';

export const LoginPage = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const data = await request('/auth/login', 'POST', { login, password });
			dispatch(fetchUserData(data.user));
			navigate('/');
		} catch (err) {
			setError(err.message);
			localStorage.removeItem('user');
		}
	};

	const handleNavToRegister = () => {
		navigate('/register');
	};

	return (
		<section className="flex flex-col gap-4 items-center justify-center w-full h-[90vh]">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col bg-sky-200/10 p-6 rounded-4xl shadow-md w-full max-w-sm gap-4"
			>
				<h2 className="text-2xl mb-4">Вход</h2>
				{error && <p className="text-red-500">{error}</p>}

				<div className="mb-4">
					<label className="block text-sky-200">Логин</label>
					<input
						type="text"
						value={login}
						onChange={(e) => setLogin(e.target.value)}
						className="border rounded w-full py-2 px-3"
						required
					/>
				</div>

				<div className="mb-4">
					<label className="block text-sky-200">Пароль</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="border rounded w-full py-2 px-3"
						required
					/>
				</div>

				<button
					type="submit"
					className="bg-btn-color hover:bg-btn-menuhover rounded-xl text-white text-md py-2 px-4 w-full cursor-pointer transition-all duration-200 ease-in-out"
				>
					Войти
				</button>
			</form>
			<span
				className="flex text-md cursor-pointer hover:opacity-65 hover:underline transition-all duration-200 ease-in-out"
				onClick={handleNavToRegister}
			>
				- Зарегистрироваться -
			</span>
		</section>
	);
};

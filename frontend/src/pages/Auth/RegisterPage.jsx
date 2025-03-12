import React, { useState } from 'react';
import { request } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUserData } from '../../store/actions/async';

export const RegisterPage = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [error, setError] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const data = await request('/auth/register', 'POST', { login, password, name, role: '1' });
			dispatch(fetchUserData(data.user));
			localStorage.setItem('user', JSON.stringify(data.user));
			navigate('/finances');
		} catch (err) {
			setError(err.message);
		}
	};

	const handleNavToLogin = () => {
		navigate('/login');
	};

	return (
		<section className="flex flex-col gap-4 items-center justify-center h-[90vh] w-full">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col bg-sky-200/10 p-6 rounded-4xl shadow-md w-full max-w-sm gap-4 "
			>
				<h2 className="text-2xl mb-4">Регистрация</h2>
				{error && <p className="text-red-500">{error}</p>}
				<div className="mb-4">
					<label className="block text-sky-200">Логин</label>
					<input
						type="text"
						value={login}
						onChange={(e) => setLogin(e.target.value)}
						className="border rounded w-full py-2 px-3 mt-2 transitions-all duration-500 ease"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sky-200">Пароль</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="border rounded w-full py-2 px-3 mt-2 transitions-all duration-500 ease"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sky-200">Имя, фамилия (или Никнейм)</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="border rounded w-full py-2 px-3 mt-2 transitions-all duration-500 ease"
						required
					/>
				</div>
				<button
					type="submit"
					className="bg-btn-color hover:bg-btn-menuhover rounded-xl text-white text-md py-2 px-4 w-full cursor-pointer transition-all duration-200 ease-in-out"
				>
					Зарегистрироваться
				</button>
			</form>
			<span
				className="flex text-md cursor-pointer hover:opacity-65 hover:underline transition-all duration-200 ease-in-out"
				onClick={handleNavToLogin}
			>
				- Войти в аккаунт -
			</span>
		</section>
	);
};

import React, { useState } from 'react';
import styles from '../styles/Login.module.css';
import { useDispatch } from 'react-redux';
import DateOfBirth from './DateOfBirth';
import axios from 'axios';
import { login } from '../features/userSlice';

const Login = () => {
	// state
	const [method, setMethod] = useState('login');
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [DOBmonth, setDOBMonth] = useState('');
	const [DOBday, setDOBDay] = useState(null);
	const [DOByear, setDOBYear] = useState(null);

	// redux
	const dispatch = useDispatch();

	// functions
	const registerUser = (e) => {
		e.preventDefault();

		if (!userName || !email || !password || !DOBmonth || !DOBday || !DOByear) {
			console.log('fill all fields');
			return;
		}

		axios
			.post(`${process.env.REACT_APP_API_URL}/register`, {
				userName,
				email,
				password,
				dateOfBirth: `${DOBmonth}, ${DOBday}, ${DOByear}`,
			})
			.then((res) => console.log(res))
			.catch((error) => console.log(error.response.data));
	};

	const loginUser = (e) => {
		e.preventDefault();

		if (!email || !password) {
			console.log('fill all fields');
			return;
		}

		axios
			.post(`${process.env.REACT_APP_API_URL}/user/login`, {
				email,
				password,
			})
			.then((res) => dispatch(login(res.data)))
			.catch((error) => console.log(error.response.data));
	};

	return (
		<div className={styles.login}>
			<img
				src='assets/discord-logo.png'
				className={styles.logo}
				alt='discord logo'
			/>
			{method === 'login' ? (
				// login
				<form className={styles.form} onSubmit={loginUser}>
					<h1>Welcome Back!</h1>

					<div className={styles.inputAndLabel}>
						<label htmlFor='email'>EMAIL</label>
						<input
							type='email'
							id='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className={styles.inputAndLabel}>
						<label htmlFor='password'>PASSWORD</label>
						<input
							type='password'
							id='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div className={styles.login__buttonContainer}>
						<button className={styles.login__button}>Login</button>

						<p className={styles.changeMethod}>
							Need An Account?
							<span onClick={() => setMethod('register')}>Register</span>
						</p>
					</div>
				</form>
			) : (
				// register
				method === 'register' && (
					<form className={styles.form}>
						<h1>Create An Account</h1>

						<div className={styles.inputAndLabel}>
							<label htmlFor='username'>USER NAME</label>
							<input
								type='text'
								id='username'
								value={userName}
								onChange={(e) => setUserName(e.target.value)}
							/>
						</div>

						<div className={styles.inputAndLabel}>
							<label htmlFor='email'>EMAIL</label>
							<input
								type='email'
								id='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<div className={styles.inputAndLabel}>
							<label htmlFor='password'>PASSWORD</label>
							<input
								type='password'
								id='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<div>
							<p>DATE OF BIRTH</p>
							<DateOfBirth
								setDOBMonth={setDOBMonth}
								setDOBDay={setDOBDay}
								setDOBYear={setDOBYear}
							/>
						</div>

						<div className={styles.login__buttonContainer}>
							<button className={styles.login__button} onClick={registerUser}>
								Register
							</button>

							<p className={styles.changeMethod}>
								Already Have An Account?
								<span onClick={() => setMethod('login')}>Login</span>
							</p>
						</div>
					</form>
				)
			)}
		</div>
	);
};

export default Login;

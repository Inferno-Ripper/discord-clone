import React, { useState } from 'react';
import styles from '../styles/Login.module.css';
import { useDispatch } from 'react-redux';
import DateOfBirth from './DateOfBirth';

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

	return (
		<div className={styles.login}>
			<img
				src='assets/discord-logo.png'
				className={styles.logo}
				alt='discord logo'
			/>
			{method === 'login' ? (
				// login
				<form className={styles.form}>
					<h1>Welcome Back!</h1>

					<div className={styles.inputAndLabel}>
						<label htmlFor='email'>EMAIL</label>
						<input type='email' id='email' />
					</div>

					<div className={styles.inputAndLabel}>
						<label htmlFor='password'>PASSWORD</label>
						<input type='password' id='password' />
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
							<input type='text' id='username' />
						</div>

						<div className={styles.inputAndLabel}>
							<label htmlFor='email'>EMAIL</label>
							<input type='email' id='email' />
						</div>

						<div className={styles.inputAndLabel}>
							<label htmlFor='password'>PASSWORD</label>
							<input type='password' id='password' />
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
							<button className={styles.login__button}>Register</button>

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

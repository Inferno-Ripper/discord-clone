import React, { useState } from 'react';
import styles from '../styles/Login.module.css';
import { useDispatch } from 'react-redux';
import DateOfBirth from './DateOfBirth';
import axios from 'axios';
import { login } from '../features/userSlice';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { toast } from 'react-toastify';

const Login = ({ rememberMe, setRememberMe }) => {
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
			toast.error('Please Fill All Fields');
			return;
		}

		if (DOBmonth === 'Month' || DOBday === 'Day' || DOByear === 'Year') {
			toast.error('Please Enter A Date Of Birth');
			return;
		}

		// check if user is older than 5 years
		if (DOByear > new Date().getFullYear() - 4) {
			toast.error('You Must Be 5 Years Or Older To Create An Account');
			return;
		}

		if (password.length < 6) {
			toast.error('Password Must Be Longer Than 6 Characters');
			return;
		}

		const generateRandomNumbers = () => {
			let randomNumbers = [];

			// generates 5 random numbers
			for (let i = 0; i < 5; i++) {
				randomNumbers.push(Math.floor(Math.random() * 9));
			}

			randomNumbers = randomNumbers.toLocaleString().replace(/\,/g, '');
			randomNumbers = Number(randomNumbers);

			return randomNumbers;
		};

		// generates 5 random numbers
		const randomColor = Math.floor(Math.random() * 16777215).toString(16);

		axios
			.post(`${process.env.REACT_APP_API_URL}/user/register`, {
				userName,
				email,
				password,
				userTag: generateRandomNumbers(),
				dateOfBirth: `${DOBmonth}, ${DOBday}, ${DOByear}`,
				rememberMe,
				userColor: randomColor,
			})
			.then((res) => dispatch(login(res.data)))
			.catch((error) => toast.error(error.response.data));
	};

	const loginUser = (e) => {
		e.preventDefault();

		if (!email || !password) {
			toast.error('Please Fill All Fields');
			return;
		}

		axios
			.post(`${process.env.REACT_APP_API_URL}/user/login`, {
				email,
				password,
				rememberMe,
			})
			.then((res) => dispatch(login(res.data)))
			.catch((error) => toast.error(error.response.data));
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
				<form className={styles.form}>
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

					<div
						className={styles.rememberMe}
						onClick={() => setRememberMe((prev) => !prev)}
					>
						<div>
							{rememberMe ? (
								<CheckBoxIcon style={{ color: '#2b82e2' }} />
							) : (
								<CheckBoxOutlineBlankIcon />
							)}
						</div>
						<p style={{ color: rememberMe ? 'white' : '#63767d' }}>
							Remember Me
						</p>
					</div>

					<div className={styles.login__buttonContainer}>
						<button
							className={styles.login__button}
							onClick={loginUser}
							type='submit'
						>
							Login
						</button>

						{/* google sign in */}
						<a
							href='https://discord-clone-backend.up.railway.app/auth/google'
							className={styles.googleLogin}
						>
							<img
								className={styles.googleLogo}
								src='/assets/google-logo.png'
								alt=''
							/>
							<p className={styles.googleLoginText}>Continue With Google</p>
						</a>

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

						<div
							className={styles.rememberMe}
							onClick={() => setRememberMe((prev) => !prev)}
						>
							<div>
								{rememberMe ? (
									<CheckBoxIcon style={{ color: '#2b82e2' }} />
								) : (
									<CheckBoxOutlineBlankIcon />
								)}
							</div>
							<p style={{ color: rememberMe ? 'white' : '#63767d' }}>
								Remember Me
							</p>
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
							<button
								className={styles.login__button}
								type='submit'
								onClick={registerUser}
							>
								Register
							</button>

							{/* google sign in */}
							<a
								href='https://discord-clone-backend.up.railway.app/auth/google'
								className={styles.googleLogin}
							>
								<img
									className={styles.googleLogo}
									src='/assets/google-logo.png'
									alt=''
								/>
								<p className={styles.googleLoginText}>Continue With Google</p>
							</a>

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

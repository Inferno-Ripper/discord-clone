import React from 'react';
import styles from '../styles/Login.module.css';
import { useDispatch } from 'react-redux';
import { guestLogin } from '../features/userSlice';

const Login = () => {
	const dispatch = useDispatch();

	const guestSignIn = () => {
		dispatch(guestLogin());
	};

	return (
		<div className={styles.login}>
			<img
				src='assets/discord-logo.png'
				className={styles.login__logo}
				alt=''
			/>
			<div className={styles.login__buttons}>
				<button className={styles.login__button}>Sign In</button>
				<button onClick={guestSignIn} className={styles.login__buttonGuest}>
					Sign In As Guest
				</button>
			</div>
		</div>
	);
};

export default Login;

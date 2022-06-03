import React from 'react';
import '../styles/Login.css';
import { useDispatch } from 'react-redux';
import { guestLogin } from '../features/userSlice';

const Login = () => {
	const dispatch = useDispatch();

	const guestSignIn = () => {
		dispatch(guestLogin());
	};

	return (
		<div className='login'>
			<img src='assets/discord-logo.png' className='login__logo' alt='' />
			<div className='login__buttons'>
				<button className='login__button'>Sign In</button>
				<button onClick={guestSignIn} className='login__buttonGuest'>
					Sign In As Guest
				</button>
			</div>
		</div>
	);
};

export default Login;

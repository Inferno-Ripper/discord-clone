import React from 'react';
import '../styles/Login.css';

const Login = () => {
	return (
		<div className='login'>
			<img src='assets/discord-logo.png' className='login__logo' alt='' />
			<div className='login__buttons'>
				<button className='login__button'>Sign In</button>
				<button className='login__buttonGuest'>Sign In As Guest</button>
			</div>
		</div>
	);
};

export default Login;

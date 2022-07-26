import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../features/userSlice';
import styles from '../styles/UserDataModal.module.css';
import Zoom from 'react-reveal/Zoom';
import { closeModal } from '../features/modalSlice';
import axios from 'axios';

const UserDataModal = ({ changeData, setChangeData }) => {
	// state
	const [newUserName, setNewUserName] = useState('');
	const [newUserEmail, setNewUserEmail] = useState('');
	const [oldUserPassword, setOldUserPassword] = useState('');
	const [newUserPassword, setNewUserPassword] = useState('');

	// redux
	const dispatch = useDispatch();

	const user = useSelector(selectUser);

	const changeDataFunction = (e) => {
		e.preventDefault();

		// change user name or user color or user email address
		if (changeData === 'userName' || changeData === 'userEmail') {
			let value;
			let updatatedValue;

			// change user name
			if (changeData === 'userName') {
				value = newUserName;

				updatatedValue = 'userName';
			}
			// 	// change user email
			else if (changeData === 'userEmail') {
				value = newUserEmail;

				updatatedValue = 'email';
			}

			axios
				.put(`${process.env.REACT_APP_API_URL}/user/update/${changeData}`, {
					userId: user.userId,
					value,
				})
				.then((res) => {
					dispatch(login({ ...user, [updatatedValue]: res.data }));
				});

			setNewUserName('');
			setNewUserEmail('');

			dispatch(closeModal());
		}

		// change user password
		else if (changeData === 'userPassword') {
			axios
				.put(`${process.env.REACT_APP_API_URL}/user/update/${changeData}`, {
					userId: user.userId,
					oldUserPassword,
					newUserPassword,
				})
				.then((res) => console.log(res))
				.catch((err) => console.log(err.response.data));

			// setNewUserPassword('');
			// setOldUserPassword('');

			dispatch(closeModal());
		}
	};

	console.log(oldUserPassword);
	console.log(newUserPassword);

	return (
		<Zoom>
			<div className={styles.container}>
				{/* change user name */}
				{changeData === 'userName' ? (
					<form onSubmit={changeDataFunction}>
						<label>Change User Name</label>

						<input
							placeholder={user.userName}
							value={newUserName}
							onChange={(e) => setNewUserName(e.target.value)}
						/>

						<button>Submit</button>

						<h1
							className={styles.closeBtn}
							onClick={() => {
								dispatch(closeModal());
								setChangeData(null);
							}}
						>
							X
						</h1>
					</form>
				) : // change user Email
				changeData === 'userEmail' ? (
					<form onSubmit={changeDataFunction}>
						<label>Change Email Address</label>

						<input
							placeholder={user.email}
							type='email'
							value={newUserEmail}
							onChange={(e) => setNewUserEmail(e.target.value)}
						/>

						<button>Submit</button>
						<h1
							className={styles.closeBtn}
							onClick={() => {
								dispatch(closeModal());
								setChangeData(null);
							}}
						>
							X
						</h1>
					</form>
				) : // change user password
				changeData === 'userPassword' ? (
					<form onSubmit={changeDataFunction}>
						<label>Change Password</label>

						<input
							placeholder='Old Password'
							type='password'
							value={oldUserPassword}
							onChange={(e) => setOldUserPassword(e.target.value)}
						/>
						<input
							placeholder='New Password'
							type='password'
							value={newUserPassword}
							onChange={(e) => setNewUserPassword(e.target.value)}
						/>

						<button>Submit</button>
						<h1
							className={styles.closeBtn}
							onClick={() => {
								dispatch(closeModal());
								setChangeData(null);
							}}
						>
							X
						</h1>
					</form>
				) : (
					<div></div>
				)}
			</div>
		</Zoom>
	);
};

export default UserDataModal;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../features/userSlice';
import styles from '../styles/UserDataModal.module.css';
import Zoom from 'react-reveal/Zoom';
import { closeModal } from '../features/modalSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ChromePicker } from 'react-color';

const UserDataModal = ({ changeData, setChangeData }) => {
	// state
	const [newUserName, setNewUserName] = useState('');
	const [newUserEmail, setNewUserEmail] = useState('');
	const [newUserColor, setNewUserColor] = useState('');
	const [oldUserPassword, setOldUserPassword] = useState('');
	const [newUserPassword, setNewUserPassword] = useState('');

	// redux
	const dispatch = useDispatch();

	const user = useSelector(selectUser);

	useEffect(() => setNewUserColor(user?.userColor), []);

	const changeDataFunction = (e) => {
		e.preventDefault();

		// change user name or user color or user email address
		if (
			changeData === 'userName' ||
			changeData === 'userEmail' ||
			changeData === 'userColor'
		) {
			let value;
			let updatatedValue;

			// change user name
			if (changeData === 'userName') {
				if (!newUserName) {
					return;
				}

				if (newUserName === user?.userName) {
					return toast.error(
						'New User Name Can Not Be The Same As The Old User Name'
					);
				}

				value = newUserName;
				updatatedValue = 'userName';
			}
			//  change user email
			else if (changeData === 'userEmail') {
				if (!newUserEmail) {
					return;
				}

				if (newUserEmail === user?.email) {
					return toast.error(
						'New Email Address Can Not Be The Same As The Old Email Address'
					);
				}

				value = newUserEmail;
				updatatedValue = 'email';
			}

			// change user color
			if (changeData === 'userColor') {
				if (!newUserColor) {
					return;
				}

				if (newUserColor === user?.userColor) {
					return toast.error(
						'New User Color Can Not Be The Same As The Old User Color'
					);
				}

				value = newUserColor;
				updatatedValue = 'userColor';
			}

			axios
				.put(`${process.env.REACT_APP_API_URL}/user/update/${changeData}`, {
					userId: user.userId,
					value,
				})
				.then((res) => {
					dispatch(login({ ...user, [updatatedValue]: res.data }));
					if (changeData === 'userName') {
						toast.success('User Name Changed');
					}
					if (changeData === 'userEmail') {
						toast.success('Email Address Changed');
					}
				});

			setNewUserName('');
			setNewUserEmail('');

			dispatch(closeModal());
		}

		// change user password
		else if (changeData === 'userPassword') {
			if (newUserPassword.length < 6) {
				return toast.error('Password Must Be Longer Than 6 Characters');
			}

			if (oldUserPassword === newUserPassword) {
				return toast.error(
					'New Password Can Not Be The Same As The Old Password'
				);
			}

			axios
				.put(`${process.env.REACT_APP_API_URL}/user/update/${changeData}`, {
					userId: user.userId,
					oldUserPassword,
					newUserPassword,
				})
				.then((res) => toast.success(res.data))
				.catch((err) => toast.error(err.response.data));
			setNewUserPassword('');
			setOldUserPassword('');

			dispatch(closeModal());
		}
	};

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
				) : changeData === 'userColor' ? (
					<form onSubmit={changeDataFunction}>
						<label>Change User Color</label>

						<ChromePicker
							className={styles.chromePicker}
							disableAlpha={true}
							color={newUserColor}
							onChange={(color) => setNewUserColor(color.hex)}
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

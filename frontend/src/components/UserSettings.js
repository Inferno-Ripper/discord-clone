import React, { useEffect, useState } from 'react';
import styles from '../styles/userSettings.module.css';
import Fade from 'react-reveal/Fade';
import { logout } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import UserDataModal from './UserDataModal';
import { openModal, selectModal } from '../features/modalSlice';

const UserSettings = ({ isSettingOpen, setIsSettingOpen }) => {
	// state
	const [changeData, setChangeData] = useState('');

	// redux
	const dispatch = useDispatch();

	const isModalOpen = useSelector(selectModal);

	useEffect(() => {
		if (isModalOpen) {
			setIsSettingOpen(false);
		}
	}, [changeData]);

	// functions
	const signOut = () => {
		dispatch(logout());

		axios.get(`${process.env.REACT_APP_API_URL}/user/logout`);
	};

	return (
		<>
			{isSettingOpen && (
				<Fade>
					<div className={styles.userSettingsContainer}>
						<button
							className={styles.btn}
							onClick={() => {
								dispatch(openModal());
								setChangeData('userName');
							}}
						>
							Change User Name
						</button>

						<button
							className={styles.btn}
							onClick={() => {
								dispatch(openModal());
								setChangeData('userEmail');
							}}
						>
							Change Email
						</button>

						<button
							className={styles.btn}
							onClick={() => {
								dispatch(openModal());
								setChangeData('userPassword');
							}}
						>
							Change Password
						</button>

						<button className={styles.btn} onClick={signOut}>
							Logout
						</button>

						<div className={styles.containerArrow}></div>
					</div>
				</Fade>
			)}

			{isModalOpen && (
				<UserDataModal changeData={changeData} setChangeData={setChangeData} />
			)}
		</>
	);
};

export default UserSettings;

import React from 'react';
import styles from '../styles/userSettings.module.css';
import Fade from 'react-reveal/Fade';
import { logout } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const UserSettings = ({ isSettingOpen }) => {
	// redux
	const dispatch = useDispatch();

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
						<button className={styles.btn}>Change User Name</button>
						<button className={styles.btn}>Change User Color</button>
						<button className={styles.btn}>Change Email</button>
						<button className={styles.btn}>Change Password</button>
						<button className={styles.btn} onClick={signOut}>
							Logout
						</button>

						<div className={styles.containerArrow}></div>
					</div>
				</Fade>
			)}
		</>
	);
};

export default UserSettings;

import React, { useEffect, useState } from 'react';
import styles from '../styles/userSettings.module.css';
import Fade from 'react-reveal/Fade';
import { logout, selectUser } from '../features/userSlice';
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
	const user = useSelector(selectUser);

	useEffect(() => {
		if (isModalOpen) {
			setIsSettingOpen(false);
		}
	}, [changeData, isModalOpen]);

	// functions
	const signOut = () => {
		dispatch(logout());

		// logout by destroying/clearing the jwt cookie from browser
		axios.get(`${process.env.REACT_APP_API_URL}/user/logout`);

		// logout of google auth
		axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`);
	};

	function getCookie(cName) {
		const name = cName + '=';
		const cDecoded = decodeURIComponent(document.cookie); //to be careful
		const cArr = cDecoded.split('; ');
		let res;
		cArr.forEach((val) => {
			if (val.indexOf(name) === 0) res = val.substring(name.length);
		});
		return res;
	}

	const authProvider = getCookie('auth-provider');

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

						{/* if the auth provider cookie is google then don't render the change password button */}
						{authProvider !== 'google' && (
							<button
								className={styles.btn}
								onClick={() => {
									dispatch(openModal());
									setChangeData('userPassword');
								}}
							>
								Change Password
							</button>
						)}

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

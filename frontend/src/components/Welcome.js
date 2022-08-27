import React from 'react';
import styles from '../styles/Welcome.module.css';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import axios from 'axios';
import { Slide } from 'react-reveal';

const Welcome = ({ setIsSettingOpen, setIsNewChannelInputOpen }) => {
	// redux
	const dispatch = useDispatch();

	// functions
	const signOut = () => {
		dispatch(logout());

		// logout by destroying/clearing the jwt cookie from browser
		axios.get(`${process.env.REACT_APP_API_URL}/user/logout`);

		// logout of google auth
		axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`);
	};

	return (
		<div className={styles.welcome}>
			<h1>Welcome To Discord</h1>

			<div className={styles.boxContainer}>
				<Slide top>
					<div
						className={styles.box}
						onClick={() => setIsNewChannelInputOpen((prev) => !prev)}
					>
						<AddIcon className={styles.icon} />
						<p>Add A New Channel</p>
						<ArrowForwardIcon className={styles.arrow} />
					</div>
				</Slide>

				<Slide top>
					<div
						className={styles.box}
						onClick={() => setIsSettingOpen((prev) => !prev)}
					>
						<SettingsIcon className={styles.icon} />
						<p>Change Settings</p>
						<ArrowForwardIcon className={styles.arrow} />
					</div>
				</Slide>

				<Slide top>
					<div className={styles.box} onClick={() => signOut()}>
						<LogoutIcon className={styles.icon} />
						<p>Logout</p>
						<ArrowForwardIcon className={styles.arrow} />
					</div>
				</Slide>
			</div>
		</div>
	);
};

export default Welcome;

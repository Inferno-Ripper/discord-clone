import React from 'react';
import styles from '../styles/Sidebar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser, selectUserTag } from '../features/userSlice';

// icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import Channel from './Channel';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PhoneIcon from '@mui/icons-material/Phone';
import MicIcon from '@mui/icons-material/Mic';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';

const Sidebar = () => {
	// redux
	const dispatch = useDispatch();

	const userTag = useSelector(selectUserTag);
	const user = useSelector(selectUser);

	// functions
	const signOut = () => {
		dispatch(logout());

		axios.get(`${process.env.REACT_APP_API_URL}/user/logout`);
	};

	return (
		<div className={styles.sidebar}>
			{/* sidebar header */}
			<div className={styles.header}>
				<img
					src='./assets/discord-logo.png'
					alt=''
					className={styles.headerLogo}
				/>
				<ExpandMoreIcon />
			</div>
			{/* sidebar channels */}
			{/* sidebar channels text*/}
			<div className={styles.channelText}>
				<div className={styles.channelTextLeft}>
					<ExpandMoreIcon /> <p>Channels</p>
				</div>
				<div className={styles.channelTextRight}>
					<AddIcon />
				</div>
			</div>

			{/* sidebar channels */}
			<div className={styles.channels}>
				<Channel channelName={'Youtube'} />
				<Channel channelName={'Twitch'} />
				<Channel channelName={'Discord'} />
			</div>

			{/* sidebar info */}

			{/* sidebar connnection */}
			<div className={styles.connection}>
				<div className={styles.connectionLeft}>
					<SignalCellularAltIcon className={styles.connectionSignalLogo} />
					<div>
						<p className={styles.connectionSignal}>Voice Connected</p>
						<p className={styles.connectionLeftStreamText}>Stream</p>
					</div>
				</div>
				<div className={styles.connectionRight}>
					<InfoOutlinedIcon />
					<PhoneIcon />
				</div>
			</div>

			<div className={styles.profile}>
				<div className={styles.profileLeft}>
					<AccountCircleIcon
						onClick={signOut}
						src={user.photo}
						alt=''
						className={styles.profileLogo}
					/>
					<div>
						<h1 className={styles.profileLeftUserName}>{user.userName}</h1>
						<p className={styles.profileLeftUserTag}>
							<span>#</span>
							{userTag}
						</p>
					</div>
				</div>

				<div className={styles.profileRight}>
					<MicIcon />
					<HeadsetMicIcon />
					<SettingsIcon />
				</div>
			</div>
		</div>
	);
};

export default Sidebar;

import React, { useEffect, useState } from 'react';
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
import UserSettings from './UserSettings';

const Sidebar = () => {
	// state
	const [channels, setChannels] = useState([]);
	const [isSettingOpen, setIsSettingOpen] = useState(false);

	// redux
	const dispatch = useDispatch();

	const userTag = useSelector(selectUserTag);
	const user = useSelector(selectUser);

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_URL}/channels`)
			.then((res) => setChannels(res.data));
	}, []);

	// functions

	const addChannel = () => {
		let newChannel = window.prompt('Enter New Channel Name');

		if (!newChannel) {
			console.log('Please Add A Channel Name');
			return;
		}

		axios
			.post(`${process.env.REACT_APP_API_URL}/channels/add`, {
				channel: newChannel,
				user: {
					name: user.userName,
					id: user.userId,
				},
			})
			.then((res) => setChannels((prevChannels) => [...prevChannels, res.data]))
			.catch((err) => console.log(err.response.data));
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
					<AddIcon onClick={addChannel} />
				</div>
			</div>

			{/* sidebar channels */}
			<div className={styles.channels}>
				{channels.map(({ channel, _id: channelId }) => {
					return (
						<Channel
							key={channelId}
							channelName={channel}
							channelId={channelId}
						/>
					);
				})}
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
						src={user.photo}
						alt=''
						className={styles.profileLogo}
					/>
					<div>
						<h1 className={styles.profileLeftUserName}>{user.userName}</h1>
						<p className={styles.profileLeftUserTag}>
							<span>#</span>
							{user.userTag}
						</p>
					</div>
				</div>

				<div className={styles.profileRight}>
					<MicIcon />
					<HeadsetMicIcon />
					<SettingsIcon
						className={isSettingOpen && styles.settingsOpen}
						onClick={() => setIsSettingOpen((prev) => !prev)}
					/>

					<UserSettings
						isSettingOpen={isSettingOpen}
						setIsSettingOpen={setIsSettingOpen}
					/>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;

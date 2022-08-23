import React, { useEffect, useState } from 'react';
import styles from '../styles/Sidebar.module.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import axios from 'axios';
import UserSettings from './UserSettings';
import Fade from 'react-reveal/Fade';
// icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import Channel from './Channel';
import CloseIcon from '@mui/icons-material/Close';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PhoneIcon from '@mui/icons-material/Phone';
import MicIcon from '@mui/icons-material/Mic';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { toast } from 'react-toastify';
import { selectChannel } from '../features/channelSlice';

const Sidebar = ({ socket }) => {
	// state
	const [channels, setChannels] = useState([]);
	const [isSettingOpen, setIsSettingOpen] = useState(false);
	const [isNewChannelInputOpen, setIsNewChannelInputOpen] = useState(false);
	const [newChannelName, setNewChannelName] = useState('');

	// redux
	const user = useSelector(selectUser);

	const selectedChannel = useSelector(selectChannel);

	useEffect(() => {
		if (socket) {
			// trigger the function to get channels from the database
			socket.emit('fetch_channels');
		}
	}, []);

	useEffect(() => {
		if (socket) {
			// fetch all of the channels from the database
			socket.on('get_channels', (data) => {
				setChannels(data);
			});
		}
	}, [socket]);

	useEffect(() => {
		if (selectedChannel) {
			socket.emit('join_channel', {
				userEmail: user.email,
				channelName: selectedChannel,
			});
		}
	}, [socket, user, selectedChannel]);

	// functions

	const addChannel = (e) => {
		e.preventDefault();

		if (!newChannelName) {
			toast.error('Please Add A Channel Name');
			return;
		}

		// add new channel to the database
		axios
			.post(`${process.env.REACT_APP_API_URL}/channels/add`, {
				channel: newChannelName,
				user: {
					name: user.userName,
					id: user.userId,
				},
			})
			.then((res) => {
				// after new channel is added to the database trigger the function to get all of the channels from the database
				socket.emit('fetch_channels');

				toast.success(`${res?.data.channel} Channel Created`);
			})
			.catch((err) => toast.error(err.response.data));

		setNewChannelName('');
		setIsNewChannelInputOpen(false);
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
					{!isNewChannelInputOpen && (
						<AddIcon
							className={styles.channelAddIcon}
							onClick={() => setIsNewChannelInputOpen(true)}
						/>
					)}
					{isNewChannelInputOpen && (
						<CloseIcon
							className={styles.channelCloseIcon}
							onClick={() => setIsNewChannelInputOpen(false)}
						/>
					)}
				</div>
			</div>

			{/* new channel input   */}
			{isNewChannelInputOpen && (
				<Fade>
					<form onSubmit={addChannel} className={styles.newChannelInput}>
						<input
							autoFocus
							type='text'
							value={newChannelName}
							onChange={(e) => setNewChannelName(e.target.value)}
						/>
						<button type='submit'>Submit</button>
					</form>
				</Fade>
			)}
			{/* sidebar channels */}
			<div className={styles.channels}>
				{channels &&
					channels.map(({ channel, _id: channelId }) => {
						return (
							<Channel
								key={channelId}
								channelName={channel}
								channelId={channelId}
								socket={socket}
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

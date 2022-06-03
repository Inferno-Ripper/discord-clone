import React from 'react';
import '../styles/Sidebar.css';

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
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/userSlice';

const Sidebar = () => {
	const user = useSelector(selectUser);

	const dispatch = useDispatch();

	const signOut = () => {
		dispatch(logout());
	};

	return (
		<div className='sidebar'>
			{/* sidebar header */}
			<div className='sidebar__header'>
				<img
					src='./assets/discord-logo.png'
					alt=''
					className='sidebar__headerLogo'
				/>
				<ExpandMoreIcon />
			</div>
			{/* sidebar channels */}
			{/* sidebar channels text*/}
			<div className='sidebar__channelText'>
				<div className='sidebar__channelTextLeft'>
					<ExpandMoreIcon /> <p>Channels</p>
				</div>
				<div className='sidebar__channelTextRight'>
					<AddIcon />
				</div>
			</div>

			{/* sidebar channels */}
			<div className='sidebar__channels'>
				<Channel channelName={'Youtube'} />
				<Channel channelName={'Twitch'} />
				<Channel channelName={'Discord'} />
			</div>

			{/* sidebar info */}

			{/* sidebar connnection */}
			<div className='sidebar__connection'>
				<div className='sidebar__connectionLeft'>
					<SignalCellularAltIcon className='sidebar__connectionSignal' />
					<div>
						<p className='sidebar__connectionSignal'>Voice Connected</p>
						<p className='sidebar__connectionLeftStreamText'>Stream</p>
					</div>
				</div>
				<div className='sidebar__connectionRight'>
					<InfoOutlinedIcon />
					<PhoneIcon />
				</div>
			</div>

			<div className='sidebar__profile'>
				<div className='sidebar__profileLeft'>
					<img
						onClick={signOut}
						src={user.photo}
						alt=''
						className='sidebar__profileLogo'
					/>
					<div>
						<h1 className='sidebar__profileLeftUserName'>{user.userName}</h1>
						<p className='sidebar__profileLeftUserTag'>
							<span>#</span>
							{user.userTag}
						</p>
					</div>
				</div>

				<div className='sidebar__profileRight'>
					<MicIcon />
					<HeadsetMicIcon />
					<SettingsIcon />
				</div>
			</div>
		</div>
	);
};

export default Sidebar;

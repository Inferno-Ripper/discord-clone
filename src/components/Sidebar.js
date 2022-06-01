import React from 'react';
import '../styles/Sidebar.css';

// icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import Channel from './Channel';
import { Button } from '@mui/material';

const Sidebar = () => {
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
					<ExpandMoreIcon /> <p>Channels </p>
				</div>
				<div className='sidebar__channelTextRight'>
					<AddIcon />
				</div>
			</div>

			{/* sidebar channel names */}
			<Channel channelName={'Youtube'} />
			<Channel channelName={'Twitch'} />
			<Channel channelName={'Discord'} />
		</div>
	);
};

export default Sidebar;

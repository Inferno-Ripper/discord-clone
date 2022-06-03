import React from 'react';
import '../styles/ChatHeader.css';

// icons
import NotificationsIcon from '@mui/icons-material/Notifications';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SendIcon from '@mui/icons-material/Send';
import HelpIcon from '@mui/icons-material/Help';
import SearchIcon from '@mui/icons-material/Search';

const ChatHeader = () => {
	return (
		<div className='chatHeader'>
			{/* chatHeader left */}
			<h2 className='chatHeader__left'>
				<span className='chatHeader__hash'>#</span> channelName
			</h2>

			{/* chatHeader right */}
			<div className='chatHeader__right'>
				<NotificationsIcon />
				<EditLocationIcon />
				<PeopleAltIcon />

				<div className='chatHeader__rightInputSearch'>
					<input className='chatHeader__rightInput' placeholder='Search' />
					<SearchIcon className='chatHeader__rightInputSearchIcon' />
				</div>

				<SendIcon />
				<HelpIcon />
			</div>
		</div>
	);
};

export default ChatHeader;

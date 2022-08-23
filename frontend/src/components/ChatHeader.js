import React from 'react';
import styles from '../styles/ChatHeader.module.css';

// icons
import NotificationsIcon from '@mui/icons-material/Notifications';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SendIcon from '@mui/icons-material/Send';
import HelpIcon from '@mui/icons-material/Help';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { selectChannel } from '../features/channelSlice';

const ChatHeader = () => {
	// redux

	const selectedChannel = useSelector(selectChannel);

	return (
		<div className={styles.chatHeader}>
			{/* chatHeader left */}
			<h2 className={styles.chatHeader__left}>
				{selectedChannel && <span className={styles.chatHeader__hash}>#</span>}
				{selectedChannel}
			</h2>

			{/* chatHeader right */}
			<div className={styles.chatHeader__right}>
				<NotificationsIcon />
				<EditLocationIcon />
				<PeopleAltIcon />

				<div className={styles.chatHeader__rightInputSearch}>
					<input
						className={styles.chatHeader__rightInput}
						placeholder='Search'
					/>
					<SearchIcon className={styles.chatHeader__rightInputSearchIcon} />
				</div>

				<SendIcon />
				<HelpIcon />
			</div>
		</div>
	);
};

export default ChatHeader;

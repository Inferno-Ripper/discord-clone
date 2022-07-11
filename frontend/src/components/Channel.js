import styles from '../styles/Channel.module.css';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const Channel = ({ channelName, channelId }) => {
	const deleteChannel = () => {
		axios.delete(
			`${process.env.REACT_APP_API_URL}/channels/delete-channel/${channelId}`
		);
	};

	return (
		<div className={styles.channel}>
			<span className={styles.channel__hash}>#</span>
			<div className={styles.container}>
				<p className={styles.channel__name}>{channelName}</p>

				<div>
					<DeleteIcon className={styles.deleteIcon} onClick={deleteChannel} />
				</div>
			</div>
		</div>
	);
};

export default Channel;

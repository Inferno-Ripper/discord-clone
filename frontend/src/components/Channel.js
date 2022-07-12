import styles from '../styles/Channel.module.css';
import React, { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { changeChannel, selectChannel } from '../features/channelSlice';

const Channel = ({ channelName, channelId }) => {
	// redux
	const dispatch = useDispatch();
	// getting the user data from redux
	const selectedChannel = useSelector(selectChannel);

	useEffect(() => {
		if (selectedChannel) {
			window.history.pushState('', '', `channel=${selectedChannel}`);
		}
	}, [selectedChannel]);

	// functions
	const deleteChannel = () => {
		axios.delete(
			`${process.env.REACT_APP_API_URL}/channels/delete-channel/${channelId}`
		);
	};

	return (
		<div
			className={`${selectedChannel === channelName && styles.channelActive} ${
				styles.channel
			}`}
			onClick={() => {
				dispatch(changeChannel(channelName));
			}}
		>
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

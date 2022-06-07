import styles from '../styles/Channel.module.css';
import React from 'react';

const Channel = ({ channelName }) => {
	return (
		<div className={styles.channel}>
			<span className={styles.channel__hash}>#</span>
			<p className={styles.channel__name}>{channelName}</p>
		</div>
	);
};

export default Channel;

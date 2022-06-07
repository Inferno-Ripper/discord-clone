import React from 'react';
import styles from '../styles/Messages.module.css';
import Message from './Message';

const Messages = () => {
	return (
		<div className={styles.messages}>
			<Message />
		</div>
	);
};

export default Messages;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectChannel } from '../features/channelSlice';
import styles from '../styles/Messages.module.css';
import Message from './Message';

const Messages = ({ socket }) => {
	const [messages, setMessages] = useState([]);

	// redux

	const selectedChannel = useSelector(selectChannel);

	useEffect(() => {
		if (selectedChannel) {
			axios
				.get(`${process.env.REACT_APP_API_URL}/messages/${selectedChannel}`)
				.then((res) => setMessages(res.data));
		}
	}, [selectedChannel]);

	useEffect(() => {
		socket.on('receive_message', (data) =>
			setMessages((prev) => [data, ...prev])
		);

		return () => socket.off('receive_message');
	}, [socket]);

	return (
		<div className={styles.messages}>
			{messages?.map(({ message, user: userFromDB, createdAt, _id }) => {
				return (
					<Message
						key={_id}
						message={message}
						userFromDB={userFromDB}
						createdAt={createdAt}
					/>
				);
			})}
		</div>
	);
};

export default Messages;

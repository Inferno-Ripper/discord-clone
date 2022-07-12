import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectChannel } from '../features/channelSlice';
import styles from '../styles/Messages.module.css';
import Message from './Message';

const Messages = () => {
	const [messages, setMessages] = useState([]);

	// redux
	const dispatch = useDispatch();

	const selectedChannel = useSelector(selectChannel);

	useEffect(() => {
		if (selectedChannel) {
			axios
				.get(`${process.env.REACT_APP_API_URL}/messages/${selectedChannel}`)
				.then((res) => setMessages(res.data));
		}
	}, [selectedChannel]);

	return (
		<div className={styles.messages}>
			{messages.map(({ message, user: userFromDB, createdAt, _id }) => {
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

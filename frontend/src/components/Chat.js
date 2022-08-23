import React, { useState } from 'react';
import styles from '../styles/Chat.module.css';
import ChatHeader from './ChatHeader';
import { selectChannel } from '../features/channelSlice';
import uuid from 'react-uuid';

// icons
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Messages from './Messages';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import axios from 'axios';

import { selectModal } from '../features/modalSlice';

const Chat = ({ socket }) => {
	const [message, setMessage] = useState('');

	// redux

	const selectedChannel = useSelector(selectChannel);
	const user = useSelector(selectUser);
	const isModalOpen = useSelector(selectModal);

	const sendMessage = (e) => {
		e.preventDefault();

		if (!message || !selectedChannel || !user) return;

		axios
			.post(`${process.env.REACT_APP_API_URL}/messages/add`, {
				channel: selectedChannel,
				message,
				user: {
					userId: user.userId,
					userName: user.userName,
					userColor: user.userColor,
				},
			})
			.then((res) => {
				socket.emit('send_message', {
					_id: uuid(),
					updatedAt: new Date(),
					createdAt: new Date(),
					channel: selectedChannel,
					message,
					user: {
						userId: user.userId,
						userName: user.userName,
						userColor: user.userColor,
					},
				});
			})
			.catch((err) => console.log(err.response.data));

		setMessage('');
	};

	return (
		<div className={styles.chat} style={{ zIndex: isModalOpen ? -1 : 1 }}>
			<ChatHeader />

			<div className={styles.inputField}>
				<form className={styles.form} onSubmit={sendMessage}>
					<AddCircleIcon style={{ fontSize: '30px' }} onClick={sendMessage} />
					<input
						placeholder={`Send A Message In The ${selectedChannel} Channel`}
						className={styles.formInput}
						disabled={selectedChannel ? false : true}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<button type='submit' className={styles.formButton}></button>
					<CardGiftcardIcon style={{ fontSize: '30px' }} />
					<GifIcon style={{ fontSize: '30px' }} />
					<EmojiEmotionsIcon style={{ fontSize: '30px' }} />
				</form>
			</div>

			<Messages socket={socket} />
		</div>
	);
};

export default Chat;

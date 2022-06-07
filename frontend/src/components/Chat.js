import React from 'react';
import styles from '../styles/Chat.module.css';
import ChatHeader from './ChatHeader';

// icons
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Messages from './Messages';

const Chat = () => {
	return (
		<div className={styles.chat}>
			<ChatHeader />

			<div className={styles.inputField}>
				<form className={styles.form}>
					<AddCircleIcon />
					<input
						placeholder='message #channelname'
						className={styles.formInput}
					/>
					<button type='submit' className={styles.formButton}></button>
					<CardGiftcardIcon />
					<GifIcon />
					<EmojiEmotionsIcon />
				</form>
			</div>

			<Messages />
		</div>
	);
};

export default Chat;

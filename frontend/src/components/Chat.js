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
					<AddCircleIcon style={{ fontSize: '30px' }} />
					<input
						placeholder='message #channelname'
						className={styles.formInput}
					/>
					<button type='submit' className={styles.formButton}></button>
					<CardGiftcardIcon style={{ fontSize: '30px' }} />
					<GifIcon style={{ fontSize: '30px' }} />
					<EmojiEmotionsIcon style={{ fontSize: '30px' }} />
				</form>
			</div>

			<Messages />
		</div>
	);
};

export default Chat;

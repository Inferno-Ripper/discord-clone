import React from 'react';
import '../styles/Chat.css';
import ChatHeader from './ChatHeader';

// icons
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Messages from './Messages';

const Chat = () => {
	return (
		<div className='chat'>
			<ChatHeader />

			<div className='chat__inputField'>
				<form className='chat__form'>
					<AddCircleIcon />
					<input
						placeholder='message #channelname'
						className='chat__formInput'
					/>
					<button type='submit' className='chat__formButton'></button>
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

import React from 'react';
import '../styles/Message.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

const Message = () => {
	const user = useSelector(selectUser);

	return (
		<div className='message'>
			<img className='message__image' src={user.photo} alt='' />
			<div className='message__nameTime'>
				<h4 className='message__userName'>{user.userName}</h4>

				<p className='message__time'>time</p>
			</div>

			<p className='message__message'>message goes here</p>
		</div>
	);
};

export default Message;

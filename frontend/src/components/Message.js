import React from 'react';
import styles from '../styles/Message.module.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Message = () => {
	const user = useSelector(selectUser);

	return (
		<div className={styles.message}>
			<AccountCircleIcon className={styles.image} src={user.photo} alt='' />
			<div className={styles.nameAndTime}>
				<h4 className={styles.userName}>{user.userName}</h4>

				<p className={styles.time}>time</p>
			</div>

			<p className={styles.messageText}>message goes here</p>
		</div>
	);
};

export default Message;

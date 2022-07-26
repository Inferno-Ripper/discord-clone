import React from 'react';
import styles from '../styles/Message.module.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import moment from 'moment';

moment().format();

const Message = ({ message, userFromDB, createdAt }) => {
	const user = useSelector(selectUser);

	return (
		<div className={styles.message}>
			<AccountCircleIcon
				className={styles.image}
				src={user.photo}
				style={{ color: 'gray' }}
				alt=''
			/>
			<div className={styles.nameAndTime}>
				<h4
					style={{ color: `#${userFromDB.userColor}` }}
					className={styles.userName}
				>
					{userFromDB.userName}
				</h4>

				<p className={styles.time}>{moment(createdAt).fromNow()}</p>
			</div>

			<p className={styles.messageText}>{message}</p>
		</div>
	);
};

export default Message;

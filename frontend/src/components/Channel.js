import '../styles/Channel.css';
import React from 'react';

const Channel = ({ channelName }) => {
	return (
		<div className='channel'>
			<span className='channel__hash'>#</span>
			<p className='channel__name'>{channelName}</p>
		</div>
	);
};

export default Channel;

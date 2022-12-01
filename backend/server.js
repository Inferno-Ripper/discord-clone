const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const channelsRoutes = require('./routes/channelsRoutes');
const messagesRoutes = require('./routes/messagesRoutes');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { protectRoute } = require('./middleware/authMiddleware');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const passport = require('passport');
// passport config
require('./passport')(passport);

const io = new Server(server, {
	cors: {
		origin: process.env.ORIGIN_URL,
		methods: ['GET', 'POST'],
	},
});

// db models
const Channel = require('./models/channelModel');

const corsOptions = {
	origin: process.env.ORIGIN_URL,
	'Access-Control-Allow-Origin': process.env.ORIGIN_URL,
	credentials: true,
	methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
	allowedHeaders: ['Content-Type'],
	exposedHeaders: ['Content-Type'],
};

// server
const port = process.env.PORT || 5000;

// Sessions
app.use(
	session({
		secret: process.env.GOOGLE_CLIENT_SECRET,
		resave: false,
		saveUninitialized: false,
		// store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
	})
);

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/channels', protectRoute, channelsRoutes);
app.use('/messages', protectRoute, messagesRoutes);

// database connection
mongoose.connect(process.env.MONGO_URI, () => {
	// console.log('connected to DB');
});

// socket io
io.on('connection', (socket) => {
	// console.log('a user has connected ' + socket.id);

	// join channel
	socket.on('join_channel', async ({ userEmail, channelName }) => {
		await socket.leaveAll();

		socket.join(channelName);

		io.to(channelName).emit(
			'everyone',
			`User with Email: ${userEmail} joined Channel: ${channelName}`
		);
	});

	// get channels
	socket.on('fetch_channels', async () => {
		try {
			const channels = [];

			const getChannelsDB = await Channel.find().select('channel');

			for (let i = 0; i < getChannelsDB.length; i++) {
				channels.push(getChannelsDB[i]);
			}

			io.emit('get_channels', channels);
		} catch (error) {
			console.log(error);
		}
	});

	// get messages
	socket.on('send_message', (data) => {
		io.to(data.channel).emit('receive_message', data);
	});

	socket.on('disconnect', () => {
		// console.log('user Disconnected');
	});
});

server.listen(port, () => {
	//  console.log(`listening on port ${port}`)
});

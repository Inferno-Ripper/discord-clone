const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const channelsRoutes = require('./routes/channelsRoutes');
const messagesRoutes = require('./routes/messagesRoutes');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { protectRoute } = require('./middleware/authMiddleware');

const app = express();

const corsOptions = {
	origin: true, //included origin as true
	credentials: true, //included credentials as true
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/user', userRoutes);
app.use('/channels', protectRoute, channelsRoutes);
app.use('/messages', protectRoute, messagesRoutes);

// database connection
mongoose.connect(process.env.MONGO_URI, () => console.log('connected to DB'));

// server
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}`));

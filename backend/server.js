const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

const corsOptions = {
	origin: true, //included origin as true
	credentials: true, //included credentials as true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/user', userRoutes);

mongoose.connect(process.env.MONGO_URI, () => console.log('connected to DB'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}`));

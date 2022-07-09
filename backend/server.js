const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/user', userRoutes);

mongoose.connect(process.env.MONGO_URI, () => console.log('connected to DB'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}`));

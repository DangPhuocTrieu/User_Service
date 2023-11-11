import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRoute from './routes/User.js';
import authRoute from './routes/Authentication.js';
import tokenRoute from './routes/Token.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, () => {
    console.log('Connected to MongoDB');
});

const app = express();
app.use(express.json());

// Routes
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/token', tokenRoute);

// Start server
app.listen(8000, () => {
    console.log('Server started on PORT 8000');
});


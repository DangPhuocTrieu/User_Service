import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userService from './services/User_Service.js';
import authService from './services/Auth_Service.js';

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, () => {
    console.log('Connected to MongoDB');
});


// Services
app.use('/api/user-service', userService);
app.use('/api/auth-service', authService);

// Start server
app.listen(8000, () => {
    console.log('User Service API started on PORT 8000');
});


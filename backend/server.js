import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Load environment variables from .env file
dotenv.config();

import connectDB from './config/db.js';
import animalRoutes from './routes/animalRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const port = process.env.PORT || 4000;

connectDB();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies
app.use(cookieParser());

// Route for root path
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Routes for animals and users
app.use('/api/animals', animalRoutes);  // Routes starting with /api/animals are handled by animalRoutes
app.use('/api/users', userRoutes);  // Routes starting with /api/users are handled by userRoutes

app.use(notFound);  // Middleware for handling 404 errors
app.use(errorHandler);  // Middleware for handling other errors

app.listen(port, () => console.log(`Server running on port ${port}`));
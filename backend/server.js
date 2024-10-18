/**
 * Project: AnimalRescue
 * File: server.js
 * Author: Jarrale Butts
 * Created: 2024-09-23
 * Purpose: Initializes the Express server, connects to the MongoDB database, 
 *          and sets up the middleware, routes, and error handling for the API.
 */

import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import animalRoutes from './routes/animalRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

// Initialize the Express application
const app = express();

// Enable CORS for all routes (specify for the frontend)
app.use(cors({
	origin: 'https://tekibotz.github.io',
}));

const port = process.env.PORT || 4000;


connectDB();



// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes for animals and users
app.use('/api/animals', animalRoutes);  // Routes starting with /api/animals are handled by animalRoutes
app.use('/api/users', userRoutes);  // Routes starting with /api/users are handled by userRoutes

// if (process.env.NODE_ENV === 'production') {
// 	const __dirname = path.resolve();
// 	// Set static folder to serve frontend files
// 	app.use(express.static(path.join(__dirname, '/frontend/build')));
  
// 	// Any route thats that does not match the API will redirect to index.html
// 	app.get('*', (req, res) =>
// 	  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
// 	);
//   } else {
// 	const __dirname = path.resolve();
// 	app.get('/', (req, res) => {
// 		// Message when accessing the root in development mode
// 	  res.send('API is running....');
// 	});
// }

// API base route message
app.get('/', (req, res) => {
	// Message when accessing the root in development mode
	res.send('API is running....');
});

// Middleware for handling 404 errors
app.use(notFound);

// Middleware for handling other errors
app.use(errorHandler);

// Start the server and log the running mode and port number
app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`));
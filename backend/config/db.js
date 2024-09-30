/**
 * Project: AnimalRescue
 * File: db.js
 * Author: Jarrale Butts
 * Created: 2024-09-23
 * Purpose: Asynchronous function to connect to MongoDB Atlas 
 *          using the URI stored in environment variables.
 */

import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log(`Error: $(error.message)`);
		process.exit(1);
	}
};

export default connectDB;
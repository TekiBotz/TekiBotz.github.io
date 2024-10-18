/**
 * Project: AnimalRescue
 * File: seeder.js
 * Author: Jarrale Butts
 * Created: 2024-09-23
 * Purpose: Database seeder, allowing the insertion and deletion 
 *          of dummy user data for development and testing purposes.
 */

import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors';
import users from "./data/users.js";
import User from "./models/userModel.js";
import connectDB from './config/db.js';

dotenv.config();

connectDB();

// Insert dummy users into the database
const addData = async () => {
	try {
		// Remove existing users from the database
		await User.deleteMany();

		// Insert the dummy users into the database
		await User.insertMany(users);

		console.log('Users sucessfully added to database!'.green.inverse);  // .green.inverse adds readability to the colsole log -> npm i colors
		process.exit(0);
	} catch (error) {
		console.error(`${error}`.red.inverse);
		process.exit(1);
	}
}

// Delete dummy users from the database
const deleteData = async () => {
	try {
		// Remove existing users from the database
		await User.deleteMany();

		console.log('Users sucessfully deleted from database!'.red.inverse);  // .red.inverse adds readability to the colsole log
		process.exit(0);
	} catch (error) {
		console.error(`${error}`.red.inverse);
		process.exit(1);
	}
}

// Used inside (root) package.json script, it will check for the '-d' when running data:add and data:delete to determine which function to run
if (process.argv[2] === '-d') {
	deleteData();
} else {
	addData();
}
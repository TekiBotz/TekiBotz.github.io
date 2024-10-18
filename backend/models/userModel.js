/**
 * Project: AnimalRescue
 * File: userModel.js
 * Author: Jarrale Butts
 * Created: 2024-09-24
 * Purpose: Mongoose schema for user accounts, including necessary 
 * 					attributes and methods for password hashing and comparison, 
 * 					enabling secure authentication.
 */

import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

// Necessary attributes for a user to be created
const userSchema = new mongoose.Schema ({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false,
	},
}, {
	timestamps: true,
});

// Compare the password entered by the user to the password stored in the database
userSchema.methods.matchPassword = async function (userEnteredPassword) {
	return await bcrypt.compare(userEnteredPassword, this.password);
}

// Hash the password before its saved to the database
userSchema.pre('save', async function (next) {
	// Check if the password is modified before hashing
	if (!this.isModified('password')) {
		next();
	}

	// Generate a salt for hashing the password
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
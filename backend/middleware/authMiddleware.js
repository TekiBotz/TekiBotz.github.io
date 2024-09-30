/**
 * Project: AnimalRescue
 * File: middleware/authMiddleware.js
 * Author: Jarrale Butts
 * Created: 2024-09-25
 * Purpose: Middleware to protect routes by verifying JWT tokens 
 *          and checking if a user has admin privileges.
 */

import jwt from "jsonwebtoken";
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// Middleware to protect routes by verifying the JWT token
const protect = asyncHandler(async (req, res, next) => {
	let token;

	// Read the JWT from the cookie
	token = req.cookies.jwt;

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRETE);
			// Attach user to decoded token
			req.user = await User.findById(decoded.userId).select('-password');
			// Proceed to the next middleware or route handler
			next();
		} catch (error) {
			console.log(error);
			res.status(401);
			throw new Error('Not authorized, token failed');
		}
	} else {
		res.status(401);
		throw new Error('Not authorized, no token');
	}
});

// Middleware to check if the user is an admin
const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		// Proceed to the next middleware or route handler
		next();
	} else {
		res.status(401);
		throw new Error('Not authorized as admin');
	}
};

export { protect, admin };
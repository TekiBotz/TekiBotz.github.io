/**
 * Project: AnimalRescue
 * File: authMiddleware.js
 * Author: Jarrale Butts
 * Created: 2024-09-25
 * Purpose: Middleware to protect routes by verifying JWT tokens and checking if a user has admin privileges.
 */

import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// Middleware to protect routes by verifying the JWT token
const protect = asyncHandler(async (req, res, next) => {
	let token;

	// Check for the token in the Authorization header
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			// Extract the token from the Authorization header
			token = req.headers.authorization.split(' ')[1];

			// Verify the token
			const decoded = jwt.verify(token, process.env.JWT_SECRETE);

			// Attach user to the request
			req.user = await User.findById(decoded.userId).select('-password');
			next();
		} catch (error) {
			console.error(error);
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
		next();
	} else {
		res.status(401);
		throw new Error('Not authorized as admin');
	}
};

export { protect, admin };
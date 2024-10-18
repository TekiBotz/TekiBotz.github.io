/**
 * Project: AnimalRescue
 * File: userController.js
 * Author: Jarrale Butts
 * Created: 2024-09-24
 * Purpose: Controller functions for handling user-related API 
 * 					requests, including authentication, registration, 
 * 					profile management, and user management for admin users.
 * 
 * asyncHandler wraps each route handler to manage errors
 * and avoid repetitive try...catch blocks
 */

import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;  // Deconstructs email and password from req body

	const user = await User.findOne({ email });

	// Check if user exists and the password matches
	if (user && (await user.matchPassword(password))) {
		generateToken(res, user._id);  // Generate and set token in the response cookie

		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;  // Deconstructs name, email, and password from req body

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	// Create new user
	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		// Generate and set token in the response cookie
		generateToken(res, user._id);

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// @desc    Logout user & clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
	// Clear the JWT cookie to log out the user
	res.cookie('jwt', '', {
		httpOnly: true,  // Prevent JavaScript access to the cookie
		expires: new Date(0),  // Set expiration date to the past
	});

	res.status(200).json({ message: 'Logged out successfully' });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
	// Find user by ID from request user object
	const user = await User.findById(req.user._id);

	if (user) {
		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
	// Find user by ID from request user object
	const user = await User.findById(req.user._id);

	if (user) {
		// Update user fields if provided
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		
		// Because the password is hashed it will only be updated if provided
		if (req.body.password) {
			user.password = req.body.password;
		}

		// Save updated user
		const updateUser = await user.save();

		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
	// Featch all users from the database
	const users = await User.find({});
  res.status(200).json(users);
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
	// Find user by ID and exclude the password field
	const user = await User.findById(req.params.id).select('-password');

	if (user) {
		res.status(200).json(user);
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
	// Find user by ID
	const user = await User.findById(req.params.id);

	if (user) {
		if (user.isAdmin) {
			res.status(400);
			throw new Error('Can not delete admin user');
		}
		await User.deleteOne({_id: user._id});
		res.status(200).json({ message: 'User deleted successfully' });
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
	// Find user by ID
	const user = await User.findById(req.params.id);

	if (user) {
		// Update user fields if provided
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.isAdmin = Boolean(req.body.isAdmin);

		// Save updated user
		const updatedUser = await user.save();

		res.status(200).json({
			_id: updateUser._id,
			name: updateUser.name,
			email: updateUser.email,
			isAdmin: updateUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

export {
	authUser,
	registerUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserByID,
	updateUser,
};
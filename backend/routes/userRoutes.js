import express from 'express';
const router = express.Router();
import { 
	authUser,
	registerUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserByID,
	updateUser,
 } from '../controllers/userController.js';
 import { protect, admin } from '../middleware/authMiddleware.js';

 // Routes for user registration and getting all users
router
	.route('/')
	.post(registerUser)
	.get(protect, admin, getUsers);

// Routes for user login/logout
router.post('/logout', logoutUser);
router.post('/login', authUser);

// Routes for user profile operations
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);

// Routes for admin user id specific operations
router
	.route('/:id')
	.delete(protect, admin, deleteUser)
	.get(protect, admin, getUserByID)
	.put(protect, admin, updateUser);

export default router;
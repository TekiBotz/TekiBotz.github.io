/**
 * Project: AnimalRescue
 * File: users.js
 * Author: Jarrale Butts
 * Created: 2024-09-23
 * Purpose: Seed user data.
 */

import bcrypt from 'bcryptjs';

const users = [
	{
		name: 'Admin User',
		email: 'admin@email.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'John Doe',
		email: 'john@email.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false,
	},
	{
		name: 'Jane Doe',
		email: 'jane@email.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false,
	},
];

export default users;
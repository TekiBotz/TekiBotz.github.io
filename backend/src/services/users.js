/**
 * Project: AnimalShelter
 * File: services/user.js
 * Author: Jarrale Butts
 * Created: 2024-08-19
 * Purpose: Defines user functions for creating, logging in, and retrieving user information.
 */

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../db/models/user.js'

// Creates a new user with hashed password and saves it to the database.
export async function createUser({
  username,
  email,
  password,
  isAdmin = false,
}) {
  const hashedPassword = await bcrypt.hash(password, 10)
  // Create new user with hashed password and store in database.
  const user = new User({ username, email, password: hashedPassword, isAdmin })
  return await user.save()
}

// Logs in a user by verifying credentials and generating a JWT.
export async function loginUser({ username, password }) {
  // Featch username from database
  const user = await User.findOne({ username })
  if (!user) {
    throw new Error('invalid username!')
  }
  // Compare user entered and hashed passsword from database
  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    throw new Error('invalid password!')
  }
  // If credintials are corrent generate JWT with user ID and admin status
  const token = jwt.sign(
    { sub: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    {
      expiresIn: '24h',
    },
  )
  return token
}

// Fetch user information by user ID
export async function getUserInfoById(userId) {
  try {
    const user = await User.findById(userId)
    if (!user) return { username: userId }
    return { username: user.username }
  } catch (err) {
    return { username: userId }
  }
}

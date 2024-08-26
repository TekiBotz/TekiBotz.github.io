/**
 * Project: AnimalShelter
 * File: routes/users.js
 * Author: Jarrale Butts
 * Created: 2024-08-19
 * Purpose: Defines HTTP routes for users, including user signup, login, and user information by ID.
 */

import { createUser, loginUser, getUserInfoById } from '../services/users.js'

// Create User Route
export function userRoutes(app) {
  app.post('/api/v1/user/signup', async (req, res) => {
    try {
      const user = await createUser(req.body)
      return res
        .status(201)
        .json({ username: user.username, isAdmin: user.isAdmin })
    } catch (err) {
      return res.status(400).json({
        error: 'failed to create the user, does the username already exist?',
      })
    }
  })

  // Login Route
  app.post('/api/v1/user/login', async (req, res) => {
    try {
      const token = await loginUser(req.body)
      return res.status(200).send({ token })
    } catch (err) {
      return res.status(400).send({
        error: 'login failed, did you enter the correct username/password?',
      })
    }
  })

  // User id Route
  app.get('/api/v1/users/:id', async (req, res) => {
    try {
      const userInfo = await getUserInfoById(req.params.id)
      return res.status(200).send(userInfo)
    } catch (err) {
      return res.status(500).send({
        error: 'Failed to retrieve user information.',
      })
    }
  })
}

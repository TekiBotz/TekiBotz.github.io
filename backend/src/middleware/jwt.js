/**
 * Project: AnimalShelter
 * File: middleware/jwt.js
 * Author: Jarrale Butts
 * Created: 2024-08-19
 * Purpose: Exports middleware for JWT authentication using the express-jwt library.
 */

import { expressjwt } from 'express-jwt'

export const requireAuth = expressjwt({
  // Retrieves the JWT secret from environment variables
  secret: () => process.env.JWT_SECRET,
  // Specifies the algorithm used for signing the JWT
  algorithms: ['HS256'],
})

/**
 * Project: AnimalShelter
 * File: app.js
 * Author: Jarrale Butts
 * Created: 2024-08-20
 * Purpose: Sets up and configures the Express application. This file initializes the server,
 *          applies middleware for handling CORS and JSON request bodies, and sets up routing
 *          for user and animal-related endpoints. It also defines a basic route for the root URL.
 */

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { userRoutes } from './routes/users.js'
import { animalRoutes } from './routes/animals.js'

const app = express()

// Middleware to enable CORS (Cross-Origin Resource Sharing).
app.use(cors())

// Middleware to parse incoming JSON request bodies.
app.use(bodyParser.json())

// User routes
userRoutes(app)

// Animal routes
animalRoutes(app)

// Root URL
app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

export { app }

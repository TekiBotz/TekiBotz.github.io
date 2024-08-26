/**
 * Project: AnimalShelter
 * File: index.js
 * Author: Jarrale Butts
 * Created: 2024-08-20
 * Purpose: Initializes environment variables, sets up and starts the Express server,
 *          and connects to the database.
 */

import dotenv from 'dotenv'
dotenv.config()

import { app } from './app.js'
import { initDatabase } from './db/init.js'

// Asynchronously initializes the database and starts the server.
try {
  await initDatabase()
  const PORT = process.env.PORT
  app.listen(PORT) // Start the Express server.
  console.info(`express server running on http://localhost:${PORT}`)
} catch (err) {
  // Log any errors related to database connection.
  console.error('error connecting to database:', err)
}

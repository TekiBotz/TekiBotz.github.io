/**
 * Project: AnimalShelter
 * File: test/globalSetup.js
 * Author: Jarrale Butts
 * Created: 2024-08-20
 * Purpose: Using Jest test runner to define and execute unit tests.
 */

import { MongoMemoryServer } from 'mongodb-memory-server'

// Global setup for Jest tests.
export default async function globalSetup() {
  // Create a new in-memory MongoDB server instance.
  const instance = await MongoMemoryServer.create({
    binary: {
      version: '6.0.4', // Same version installed for the Docker container
    },
  })
  // Attach the MongoDB instance to the global object for use in tests.
  global.__MONGOINSTANCE = instance
  // Set the environment variable for the database connection URI.
  process.env.DATABASE_URL = instance.getUri()
}

/**
 * Project: AnimalShelter
 * File: test/setupFileAfterEnv.js
 * Author: Jarrale Butts
 * Created: 2024-08-20
 * Purpose: Define beforeAll function to initialize database connection in Mongoose
 *          before all tests run and an afterAll function to disconnect from the database
 *          after all tests finish running.
 */

import mongoose from 'mongoose'
import { beforeAll, afterAll } from '@jest/globals'
import { initDatabase } from '../db/init.js'
beforeAll(async () => {
  await initDatabase()
})
afterAll(async () => {
  await mongoose.disconnect()
})

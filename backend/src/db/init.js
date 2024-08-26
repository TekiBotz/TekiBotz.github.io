/**
 * Project: AnimalShelter
 * File: db/init.js
 * Author: Jarrale Butts
 * Created: 2024-08-19
 * Purpose: Initializes the connection to the MongoDB database.
 *
 * Outcome: Demonstrated an ability to use well-founded and innovative
 * techniques, skills, and tools in computing practices for the purpose
 * of implementing computer solutions that deliver value and accomplish
 * industry-specific goals by completing the following enhancement of a
 * cloud-hosted database allowing for more scalability with computing power,
 * storage, and security. Developed a security mindset that anticipates
 * adversarial exploits in software architecture and designs to expose
 * potential vulnerabilities, mitigate design flaws, and ensure privacy
 * and enhanced security of data and resources by completing the following
 * enhancement of a cloud-hosted database allowing for more scalability with
 * computing power, storage, and security.
 */

import mongoose from 'mongoose'

export function initDatabase() {
  // Retrieve the database URL from environment variables
  const DATABASE_URL = process.env.DATABASE_URL

  // Log a message when the connection is successfully opened
  mongoose.connection.on('open', () => {
    console.info('Successfully connected to database:', DATABASE_URL)
  })

  // Handle connection errors
  mongoose.connection.on('error', (err) => {
    console.error('Error connecting to database:', err)
  })

  // Connect to the MongoDB database and return the connection promise
  return mongoose
    .connect(DATABASE_URL)
    .then(() => {
      console.info('Database connection established.')
    })
    .catch((err) => {
      console.error('Failed to connect to database:', err)
      process.exit(1)
    })
}

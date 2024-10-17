/**
 * Project: AnimalRescue
 * File: constants.js
 * Author: Jarrale Butts
 * Created: 2024-09-25
 * Purpose: Configuration for API endpoints used in the application.
 */

// Uncomment the line below if you need to use a development or production URL.
// export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '';

// Set the base URL to an empty string for now. Adjust as needed for your environment.
export const BASE_URL = '';

// Endpoint for animals-related API requests
export const ANIMALS_URL = `${BASE_URL}/api/animals`;

// Endpoint for users-related API requests
export const USERS_URL = `${BASE_URL}/api/users`;

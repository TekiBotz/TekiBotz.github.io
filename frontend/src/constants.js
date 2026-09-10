/**
 * Project: AnimalRescue
 * File: constants.js
 * Author: Jarrale Butts
 * Created: 2024-09-25
 * Purpose: Configuration for API endpoints used in the application.
 */

// API host. Set REACT_APP_API_URL per environment (see frontend/.env.example);
// falls back to the local backend for development.
export const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

// Endpoint for animals-related API requests
export const ANIMALS_URL = `${BASE_URL}/api/animals`;

// Endpoint for users-related API requests
export const USERS_URL = `${BASE_URL}/api/users`;

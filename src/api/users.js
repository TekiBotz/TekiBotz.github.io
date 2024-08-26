/**
 * Project: AnimalShelter
 * File: api/users.js
 * Author: Jarrale Butts
 * Created: 2024-08-22
 * Purpose: Functions for user authentication and information retrieval.
 *          Includes signup, login, and fetching user information by ID.
 */

// Signup function
export const signup = async ({ username, email, password }) => {
  // Make POST request to the signup endpoint
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  })

  if (!res.ok) throw new Error('Failed to sign up')
  return await res.json()
}

// Login function
export const login = async ({ username, password }) => {
  // Make POST request to the login endpoint
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  if (!res.ok) throw new Error('failed to login')

  // Extract the token and userId from the response
  const { token, userId } = await res.json()
  return { token, userId }
}

// Featch User by id
export const getUserInfo = async (id) => {
  // Make GET request to retrieve user information by ID
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  return await res.json()
}

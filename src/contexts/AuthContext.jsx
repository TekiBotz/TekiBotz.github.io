/**
 * Project: AnimalShelter
 * File: contexts/AuthContext.jsx
 * Author: Jarrale Butts
 * Created: 2024-08-24
 * Purpose: Provides authentication context to manage and share the current user's token and details across the application.
 */

import { createContext, useState, useContext, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import PropTypes from 'prop-types'

// Create an authentication context with default values
export const AuthContext = createContext({
  token: null,
  setToken: () => {},
  user: null,
  setUser: () => {},
})

// AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
  // State for storing the authentication token
  const [token, setToken] = useState(localStorage.getItem('token'))

  // State for storing the decoded user information
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token')
    return token ? jwtDecode(token) : null
  })

  // Effect that runs whenever the token changes
  useEffect(() => {
    if (token) {
      // Save the token to localStorage and decode the user information
      localStorage.setItem('token', token)
      setUser(jwtDecode(token))
    } else {
      // Remove the token and clear the user information if the token is null
      localStorage.removeItem('token')
      setUser(null)
    }
  }, [token])

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

// useAuth hook to consume the authentication context values.
export function useAuth() {
  const { token, setToken, user, setUser } = useContext(AuthContext)
  return { token, setToken, user, setUser }
}

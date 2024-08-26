/**
 * Project: AnimalShelter
 * File: component/AdminRoute.jsx
 * Author: Jarrale Butts
 * Created: 2024-08-23
 * Purpose: Provides a route guard that restricts access to admin-only routes.
 */

// AdminRoute component
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// Renders the given children if the user is an admin else redirects to the login page.
export function AdminRoute({ children }) {
  const { user } = useAuth()

  // Redirect to the login page if the user is not an admin
  if (!user || !user.isAdmin) {
    return <Navigate to='/login' />
  }

  return children
}

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
}

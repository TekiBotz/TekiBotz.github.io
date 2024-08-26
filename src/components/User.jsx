/**
 * Project: AnimalShelter
 * File: components/User.jsx
 * Author: Jarrale Butts
 * Created: 2024-08-24
 * Purpose: Fetches and displays a user's information based on their ID.
 */

import { useQuery } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { getUserInfo } from '../api/users.js'

// User component
export function User({ id }) {
  // Fetch user information
  const userInfoQuery = useQuery({
    queryKey: ['users', id],
    queryFn: () => getUserInfo(id),
  })

  // Retrieve the user information, defaulting to an empty object if not available
  const userInfo = userInfoQuery.data ?? {}
  return <strong>{userInfo?.username ?? id}</strong>
}

User.propTypes = {
  id: PropTypes.string.isRequired,
}

/**
 * Project: AnimalShelter
 * File: components/LoadingSpinner.jsx
 * Author: Jarrale Butts
 * Created: 2024-08-23
 * Purpose: A visual component to indicate that the screen or data is currently loading.
 */

import { Spinner } from 'react-bootstrap'

// LoadingSpinner component
const LoadingSpinner = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: '75px',
        height: '75px',
        margin: 'auto',
        display: 'block',
      }}
    />
  )
}

export default LoadingSpinner

/**
 * Project: AnimalShelter
 * File: components/AlertMessage.jsx
 * Author: Jarrale Butts
 * Created: 2024-08-23
 * Purpose: A reusable AlertMessage component that displays an alert message with
 *          customizable variant.
 */

// AlertMessage component
import PropTypes from 'prop-types'
import { Alert } from 'react-bootstrap'

function AlertMessage({ variant = 'info', children }) {
  return <Alert variant={variant}>{children}</Alert>
}

AlertMessage.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default AlertMessage

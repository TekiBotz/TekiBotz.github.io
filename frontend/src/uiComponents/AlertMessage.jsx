/**
 * Project: AnimalRescue
 * File: AlertMessage.jsx
 * Author: Jarrale Butts
 * Created: 2024-09-21
 * Purpose: Displays a colored alert message to the user.
 *          The variant prop determines the alert's appearance (e.g., success, danger, info).
 */

import React from 'react'
import { Alert } from "react-bootstrap";

const AlertMessage = ({ varient, children }) => {
  return <Alert variant={varient}>{children}</Alert>
};

AlertMessage.defaultProps = {
    variant: 'info',
};

export default AlertMessage
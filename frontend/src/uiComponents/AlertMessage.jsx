import React from 'react'
import { Alert } from "react-bootstrap";

// Displays a colored message to the user based on variant
const AlertMessage = ({ varient, children }) => {
  return <Alert variant={varient}>{children}</Alert>
};

AlertMessage.defaultProps = {
    variant: 'info',
};

export default AlertMessage
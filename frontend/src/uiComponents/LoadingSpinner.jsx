import React from 'react'
import { Spinner } from "react-bootstrap";

// Spinner added for visual effects when screen is loading
const LoadingSpinner = () => {
  return (
    <Spinner
        animation='border'
        role='status'
        style={{
            width: "75px",
            height: "75px",
            margin: "auto",
            display: "block",
        }}
    />
  )
}

export default LoadingSpinner
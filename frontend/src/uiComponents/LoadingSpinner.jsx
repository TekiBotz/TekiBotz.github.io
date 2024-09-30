/**
 * Project: AnimalRescue
 * File: LoadingSpinner.js
 * Author: Jarrale Butts
 * Created: 2024-09-16
 * Purpose: Displays a loading spinner to provide visual feedback
 *          while the app is waiting for data to load.
 */

import React from 'react';
import { Spinner } from "react-bootstrap";

const LoadingSpinner = () => {
  return (
    <Spinner
        animation='border'    // Border animation for loading spinner
        role='status'         // Aria role for accessibility
        style={{
            width: "75px",
            height: "75px",
            margin: "auto",
            display: "block",
        }}
    />
  );
}

export default LoadingSpinner;
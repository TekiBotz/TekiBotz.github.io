/**
 * Project: AnimalShelter
 * File: main.jsx
 * Author: Jarrale Butts
 * Created: 2024-08-20
 * Purpose: Entry point for the React application.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/index.css'
import { App } from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

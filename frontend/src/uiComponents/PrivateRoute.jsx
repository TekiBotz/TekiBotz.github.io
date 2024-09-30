/**
 * Project: AnimalRescue
 * File: PrivateRoute.jsx
 * Author: Jarrale Butts
 * Created: 2024-09-23
 * Purpose: Restricts access to certain routes, allowing only authenticated users
 *          to view them. If the user is not authenticated, they are redirected to the login page.
 */

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};
export default PrivateRoute;
/**
 * Project: AnimalRescue
 * File: AdminRoute.js
 * Author: Jarrale Butts
 * Created: 2024-09-22
 * Purpose: This component restricts access to certain routes to only authenticated users who are admins.
 *          If the user is not an admin, they are redirected to the login page.
 */

import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);  // Access user info from store.js
  return userInfo && userInfo.isAdmin ? 
    <Outlet /> : <Navigate to='login' replace />;
};

export default AdminRoute;

import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

// Ensures only authenticated users/admins can access certain routes.
const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);  // Access user info from store.js
  return userInfo && userInfo.isAdmin ? 
    <Outlet /> : <Navigate to='login' replace />;
};

export default AdminRoute;

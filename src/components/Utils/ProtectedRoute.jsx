import React from 'react';
import { useSelector } from 'react-redux';
import {Outlet, useLocation ,Navigate} from 'react-router-dom';

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet/>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
};

export default ProtectedRoute;

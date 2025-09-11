// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('elizaAuthToken');

  return token ? children : <Navigate to="/" replace />;
}

export default PrivateRoute;

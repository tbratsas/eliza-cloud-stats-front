// src/components/DashboardLayout.js
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './Header';

function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('elizaAuthToken');
    navigate('/');
  };

  return (
    <>
      <Header onLogout={handleLogout} />
      <Container className="mt-5 text-center">
        <Outlet />
      </Container>
    </>
  );
}

export default DashboardLayout;

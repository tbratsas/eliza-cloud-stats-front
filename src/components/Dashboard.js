import React from 'react';
import Header from './Header';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('elizaAuthToken');
    navigate('/');
  };

  return (
    <>
      <Header onLogout={handleLogout} />

      <Container className="mt-5 text-center">
        <h2>Dashboard!</h2>
        {/* Your dashboard content goes here */}
      </Container>
    </>
  );
}

export default Dashboard;

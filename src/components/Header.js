// src/components/Header.js
import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

function Header({ onLogout }) {
  return (
    <Navbar bg="light" variant="light" sticky="top" className="px-4 justify-content-between">
      <Navbar.Brand>
        <h1 className="mb-0">Eliza Statistics</h1>
      </Navbar.Brand>
      <Nav>
        <Button variant="danger" onClick={onLogout}>
          Logout
        </Button>
      </Nav>
    </Navbar>
  );
}

export default Header;

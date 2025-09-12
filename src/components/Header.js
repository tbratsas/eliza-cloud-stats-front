// src/components/Header.js
import React from 'react';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';

function Header({ onLogout }) {
  return (
    <Navbar bg="light" variant="light" sticky="top" className="px-4 justify-content-between">
      {/* Left side */}
      <div className="d-flex align-items-center gap-4">
        <Navbar.Brand>
          <h1 className="mb-0">Eliza</h1>
        </Navbar.Brand>
        <NavDropdown title="Κατηγορίες" id="basic-nav-dropdown">
          <NavDropdown.Item href="#">Πωλήσεις</NavDropdown.Item>
          <NavDropdown.Item href="#" disabled>Second option</NavDropdown.Item>
          <NavDropdown.Item href="#" disabled>Third option</NavDropdown.Item>
        </NavDropdown>
      </div>

      {/* Right side */}
      <Nav>
        <Button variant="danger" onClick={onLogout}>
          Αποσύνδεση
        </Button>
      </Nav>
    </Navbar>
  );
}

export default Header;

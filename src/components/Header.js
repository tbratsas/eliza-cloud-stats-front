// src/components/Header.js
import React from 'react';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header({ onLogout }) {
  return (
    <Navbar bg="light" variant="light" sticky="top" className="px-4 justify-content-between">
      <div className="d-flex align-items-center gap-4">
        <Navbar.Brand as={Link} to="/dashboard">
          <h1 className="mb-0">Eliza</h1>
        </Navbar.Brand>
        <NavDropdown title="Προϊόντα" id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} to="/dashboard/salespercategory">
            Πωλήσεις ανά Κατηγορία Προϊόντων
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/dashboard/salesperproduct">
            Πωλήσεις ανά Προϊόν
          </NavDropdown.Item>
          {/* Add more dropdown items here */}
        </NavDropdown>

        <NavDropdown title="ΦΠΑ" id="basic-vat-dropdown">
          <NavDropdown.Item as={Link} to="/dashboard/vat">
            Συνολικό ΦΠΑ
          </NavDropdown.Item>
          {/* Add more dropdown items here */}
        </NavDropdown>

      </div>
      <Nav>
        <Button variant="danger" onClick={onLogout}>
          Αποσύνδεση
        </Button>
      </Nav>
    </Navbar>
  );
}

export default Header;

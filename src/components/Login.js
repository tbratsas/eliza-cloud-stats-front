// src/components/Login.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import config from '../config';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log(`${config.API_BASE_URL}/auth/login`)
    try {
      const response = await axios.post(`${config.API_BASE_URL}/auth/login`, {
        username,
        password
      });

      const token = response.data.token;
      localStorage.setItem('elizaAuthToken', token);

      navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Container style={{marginTop: "5%"}}>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Eliza Αναφορές</h2>
          <hr></hr>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Σύνδεση
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;

import React, { useEffect, useState } from 'react';
import { ListGroup, Button, Container, Row, Col, Collapse, Form } from 'react-bootstrap';
import axios from 'axios';
import config from '../../config';
import ElizaPieChart from '../../charts/ElizaPieChart'

export default function SalesPerProduct() {
  const [salesPerProduct, setSalesPerProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');


  const handleToggle = () => {
    setShowChart(!showChart);
  };

  useEffect(() => {
    const token = localStorage.getItem('elizaAuthToken');
    axios.get(`${config.API_BASE_URL}/sales_per_product`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setSalesPerProduct(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching sales data:', err);
        setError('Failed to load sales data');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Φόρτωση δεδομένων...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container className="mt-4">
      {/* Dates */}
      <Row className="mb-3">
        <Col xs="auto">
          <h5>Ημερομηνίες</h5>
        </Col>
        <Col xs="auto">
          <Form.Label>Από</Form.Label>
          <Form.Control
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            max={endDate || undefined}
          />
        </Col>
        <Col xs="auto">
          <Form.Label>Έως</Form.Label>
          <Form.Control
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate || undefined}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 style={{ textAlign: 'left' }}>Πωλήσεις Προϊόντων</h2>
          <hr></hr>
        </Col>
      </Row>

      <Row>
        <Col>
          <ListGroup style={{ textAlign: 'left' }}>
            {salesPerProduct.map((item, index) => (
              <ListGroup.Item key={index}>
                {item.product_name} - {item.total_quantity} / {item.total_sales}€
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col xs="auto">
          <Button variant="primary" onClick={handleToggle}>
            {showChart ? 'Απόκρυψη Γραφήματος' : 'Εμφάνιση Γραφήματος'}
          </Button>
        </Col>
      </Row>

      {showChart && (
        <Row>
          <Col>
            <Collapse in={showChart}>
              <ElizaPieChart
                data={salesPerProduct}
                title="Πωλήσεις ανα ΠροΪόν"
              />
            </Collapse>
          </Col>
        </Row>
      )}
    </Container>
  )
}

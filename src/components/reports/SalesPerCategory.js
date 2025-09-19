import React, { useEffect, useState } from 'react';
import { ListGroup, Button, Container, Row, Col, Collapse } from 'react-bootstrap';
import axios from 'axios';
import config from '../../config';
import DateRangeFilter from './DateRangeFilter';
import ElizaColumnChart from '../../charts/ElizaColumnChart';

export default function SalesPerCategory() {
  const [salesPerCategory, setSalesPerCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChart, setShowChart] = useState(false);
  
  const handleToggle = () => {
    setShowChart(!showChart);
  };

  useEffect(() => {
    const token = localStorage.getItem('elizaAuthToken');
    axios.get(`${config.API_BASE_URL}/sales_per_category`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setSalesPerCategory(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Φόρτωση δεδομένων...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container className="mt-4">
      {/* Dates */}
      <DateRangeFilter
        onFilter={({ startDate, endDate }) => {
          console.log('Filtering from:', startDate, 'to:', endDate);
          // You can now use these values to filter your data
        }}
      />

      <Row>
        <Col>
          <h2 className="text-start">Πωλήσεις ανα Κατηγορία Προϊόντων</h2>
          <hr />
        </Col>
      </Row>

      <Row>
        <Col>
          <ListGroup className="text-start">
            {salesPerCategory.map((item, index) => (
              <ListGroup.Item key={index}>
                {item.category_name} - {item.total_quantity} / {item.total_sales}€
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
              <div>
                <ElizaColumnChart
                  data={salesPerCategory}
                  title="Πωλήσεις ανα Κατηγορία Προϊόντων"
                  chartType="ColumnChart"
                />
              </div>
            </Collapse>
          </Col>
        </Row>
      )}
    </Container>
  );
}

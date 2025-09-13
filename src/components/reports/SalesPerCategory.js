import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import axios from 'axios';
import config from '../../config';
import ElizaColumnChart from '../../charts/ElizaColumnChart';

export default function SalesPerCategory() {
  const [salesPerCategory, setSalesPerCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div>
      <h2 style={{ textAlign: 'left' }}>Πωλήσεις ανα Κατηγορία Προϊόντων</h2>
      <hr></hr>
      <ListGroup style={{textAlign: 'left'}}>
        {salesPerCategory.map((item, index) => (
          <ListGroup.Item key={index}>
            {item.category_name} - {item.total_quantity} / {item.total_sales}€
          </ListGroup.Item>
        ))}
      </ListGroup>
      <ElizaColumnChart
        data={salesPerCategory}
        title="Πωλήσεις ανα Κατηγορία Προϊόντων"
        chartType="ColumnChart"  
      />
    </div>
  );
}

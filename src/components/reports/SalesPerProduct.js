import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import axios from 'axios';
import config from '../../config';
import ElizaChart from '../../charts/ElizaChart';

export default function SalesPerProduct() {
  const [salesPerProduct, setSalesPerProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div>
      <h2 style={{ textAlign: 'left' }}>Πωλήσεις Προϊόντων</h2>
      <hr></hr>
      <ListGroup style={{textAlign: 'left'}}>
        {salesPerProduct.map((item, index) => (
          <ListGroup.Item key={index}>
            {item.product_name} - {item.total_quantity} / {item.total_price}€
          </ListGroup.Item>
        ))}
      </ListGroup>
      <ElizaChart data={salesPerProduct} title="Πωλήσεις ανα ΠροΪόν"/>
    </div>
  );
}

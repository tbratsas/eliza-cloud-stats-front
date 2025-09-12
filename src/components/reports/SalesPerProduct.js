import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';

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

  if (loading) return <div>Loading sales data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Sales Per Product</h2>
      <ul>
        {salesPerProduct.map((item, index) => (
          <li key={index}>
            {item.product_name} — {item.total_quantity} units — €{item.total_price}
          </li>
        ))}
      </ul>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';
import { ListGroup } from 'react-bootstrap';

export default function SalesPerProduct() {
    const [vat, setVat] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //console.log(vat)

    useEffect(() => {
        const token = localStorage.getItem('elizaAuthToken');
        axios.get(`${config.API_BASE_URL}/vat`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setVat(response.data);
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
            <h2 style={{ textAlign: 'left' }}>ΦΠΑ</h2>
            <hr></hr>
            <ListGroup  style={{textAlign: 'left'}}>
                {vat.map((item, index) => {
                    let vat_str = '';

                    if (item.vat === 1) {
                        vat_str = '24%';
                    } else if (item.vat === 2) {
                        vat_str = '13%';
                    }

                    return (
                        <ListGroup.Item key={index}>
                            <strong>{vat_str}:</strong> €{item.total_vat_amount.toFixed(2)}
                        </ListGroup.Item>
                    );
                })}

            </ListGroup>
        </div>
    );
}
